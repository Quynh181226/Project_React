import { useState, useEffect, type ChangeEvent } from "react";
import { Button, Input, Modal, message } from "antd";
import axios from "axios";
import type { Category } from "../types/type";
import { useAppDispatch } from "../hooks/Hook";
import { addCategory, editCategory } from "../apis/CateApi";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    category?: Category;
    code: "Add" | "Edit";
}

const ModalAddEditCategory = ({ open, onClose, category, code }: ModalProps) => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState(category?.name ?? "");
    const [image, setImage] = useState<string>(category?.image ?? "");
    const [file, setFile] = useState<File | null>(null);
    const [displayFileName, setDisplayFileName] = useState<string | null>(null); // Thêm state này
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset dữ liệu khi mở modal
    useEffect(() => {
        setName(category?.name ?? "");
        setImage(category?.image ?? "");
        setFile(null);
        setError(null);
        if (category?.image && code === "Edit") {
            // Hiển thị tên file cũ
            setDisplayFileName(category.image.split("/").pop() || "No file selected");
        } else {
            // Reset khi Add hoặc không có image
            setDisplayFileName(null);
        }
    }, [open, category, code]);

    // Khi chọn file ảnh
    const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            // hiển thị preview tạm thời
            setImage(URL.createObjectURL(selectedFile));
            // Cập nhật tên file vào placeholder
            setDisplayFileName(selectedFile.name);
        }
    };

    // Upload ảnh lên Cloudinary
    const uploadToCloudinary = async (): Promise<string | null> => {
        // nếu không chọn ảnh mới thì giữ ảnh cũ
        if (!file) return image;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "React_Ra");

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dtxlzevgb/image/upload",
                formData
            );
            return res.data.secure_url;
        } catch (err) {
            console.error("Upload failed:", err);
            message.error("Lỗi khi tải ảnh lên Cloudinary!");
            return null;
        }
    };

    // Khi bấm Lưu
    const handleSubmit = async () => {
        if (!name.trim()) {
            setError("Tên danh mục không được để trống");
            return;
        }

        // setLoading(true);
        setError(null);

        // Upload ảnh nếu có file mới
        const imageUrl = await uploadToCloudinary();
        // !imageUrl.trim()
        if (!imageUrl) {
            // setLoading(false);
            setError("Cate image not empty");
            return;
        }

        const categoryData = { name, image: imageUrl };

        try {
            if (code === "Add") {
                await dispatch(addCategory(categoryData));
                message.success("Cate add success");
            } else if (code === "Edit" && category) {
                await dispatch(editCategory({ ...category, ...categoryData }));
                message.success("Cate update success");
            }
            onClose();
        } catch {
            message.error("An error occurred while save");
        }
        // finally {
        //     setLoading(false);
        // }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={code === "Add" ? "Add category" : "Edit category"}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    // loading={loading}
                    onClick={handleSubmit}
                >
                    Save
                </Button>,
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">
                    Category name :
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)}/>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            </div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">
                    Category image:
                </label>
                <div className="flex flex-row border-l-stone-100">
                    <Input
                        addonBefore={
                            <span onClick={() => document.getElementById("fileInput")?.click()}>
                                Choose file
                            </span>
                        }
                        placeholder={displayFileName || "No file selected"}
                        // readOnly
                        style={{ width: "100%" }}
                    />
                    <input id="fileInput" type="file" accept="image/*" onChange={handleInputFile} className="hidden"                    />
                </div>
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>

            {/*{error && <div className="text-red-500 text-sm mt-2">{error}</div>}*/}

            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalAddEditCategory;