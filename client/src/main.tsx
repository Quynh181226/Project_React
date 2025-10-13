// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { Store } from "./stores/Store";
// import AppRouter from "./routers/AppRouter";
// import "./index.css";
//
// // import { ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css"; // Bắt buộc import CSS
//
// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//         <Provider store={Store}>
//             <AppRouter />
//              {/*ToastContainer chỉ cần khai báo 1 lần*/}
//             {/*<ToastContainer*/}
//             {/*    position="top-right" // Vị trí toast*/}
//             {/*    autoClose={300}    // 3 giây tự tắt*/}
//             {/*    hideProgressBar={false}*/}
//             {/*    newestOnTop={false}*/}
//             {/*    closeOnClick*/}
//             {/*    rtl={false}*/}
//             {/*    pauseOnFocusLoss*/}
//             {/*    draggable*/}
//             {/*    pauseOnHover*/}
//             {/*    theme="colored"     // Giao diện đẹp hơn*/}
//             {/*/>*/}
//         </Provider>
//     </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Store } from "./stores/Store";
import AppRouter from "./routers/AppRouter";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={Store}>
            <AppRouter />
            <ToastContainer
                position="top-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Provider>
    </React.StrictMode>
);