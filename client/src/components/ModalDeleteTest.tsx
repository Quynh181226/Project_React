// ModalDeleteTest.tsx (update types, useAppDispatch)
import { Button, Modal } from "antd";
import type {TestDetail} from '../types/type';
import {useAppDispatch} from "../hooks/Hook.ts";
import {deleteTest} from "../apis/TestApi.ts";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    test?: TestDetail;
}

const ModalDeleteTest = ({ open, onClose, test }: ModalProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        if (test) {
            dispatch(deleteTest(test.id));
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Xác nhận xóa"
            footer={[
                <Button key="reset" onClick={onClose}>Cancel</Button>,
                <Button key="delete" type="primary" className="!bg-red-700" onClick={handleDelete}>Delete</Button>
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>
            <p className="text-base font-normal my-10">Bạn chắc chắn muốn xóa bài test "{test?.title}"?</p>
            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalDeleteTest;