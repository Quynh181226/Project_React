### Docs chính thức của Fontawesome để import, install và setting trong react
https://docs.fontawesome.com/v6/web/use-with/react

![img.png](img.png)

### Docs chính thức của Toastify
https://www.npmjs.com/package/react-toastify

https://www.pinterest.com/

https://www.skypack.dev/view/react-cssfx-loading

### Docs ```createAsyncThunk```:
https://redux-toolkit.js.org/api/createAsyncThunk

NGUỒN LOGIN:
https://www.webskilllab.com/javascript/authentication-dang-nhapdang-xuat-trong-react

---

POST : nên dùng để tạo tài nguyên , chỉnh sửa collection .

PUT : dùng để update tài nguyên , các tài nguyên riêng lẻ .

PATCH : dùng update 1 phần tài nguyên , nhanh hơn PUT.

---

## Axios với React

Axios là một HTTP client được viết dựa trên Promises được dùng để hỗ trợ cho việc xây dựng các ứng dụng API từ đơn giản đến phức tạp và có thể được sử dụng cả ở trình duyệt hay Node.js.

### Đặc điểm Axios

1. Tạo XMLHttpRequests từ trình duyệt
2. Thực hiện các http request từ node.js
3. Hỗ trợ Promise API
4. chặn request và response
5. Chuyển đổi dữ liệu request và response
6. Hủy requests
7. Tự động chuyển đổi về dữ liệu JSON
8. Hỗ trợ phía client để chống lại XSRF


***1. baseURL:*** nếu bạn chỉ định một base URL, nó sẽ được đính vào trước bất cứ một URL tương đối nào mà bạn sử dụng.

***2. headers:*** một object gồm các cặp key/value có thể gửi trong header của request.

***3. params:*** một object gồm các cặp key/value mà sẽ được serialize và đính vào URL dưới dạng một query string.

[//]: # (---)

[//]: # (##  Vấn đề: JSX sinh ra kiểu gì?)

[//]: # (```tsx)

[//]: # (<div>Hello</div>)

[//]: # (```)

[//]: # ()
[//]: # (=> Thì **TypeScript** hiểu đây là **một phần tử React**.)

[//]: # (Kiểu dữ liệu thật của nó là:)

[//]: # ()
[//]: # (```ts)

[//]: # (JSX.Element)

[//]: # (```)

[//]: # ()
[//]: # ()
[//]: # (###  `Element` vs `JSX.Element` khác nhau chỗ nào?)

[//]: # ()
[//]: # (| Kiểu          | Nguồn gốc                | Dùng ở đâu                       | Mô tả                                                                           |)

[//]: # (| ------------- |--------------------------| -------------------------------- | ------------------------------------------------------------------------------- |)

[//]: # (| `Element`     | DOM API của trình duyệt **"DOM type"** | TypeScript / JavaScript gốc      | Là **phần tử HTML thật** trong DOM &#40;kiểu như `HTMLElement`, `SVGElement`, v.v.&#41; |)

[//]: # (| `JSX.Element` | React định nghĩa         | React / TypeScript &#40;JSX context&#41; | Là **phần tử React** được tạo khi bạn viết `<div>...</div>`                     |)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (Nếu bạn muốn linh hoạt hơn, thay vì chỉ `JSX.Element`, có thể dùng:)

[//]: # (```ts)

[//]: # (categoryDisplay: React.ReactNode)

[//]: # (```)

[//]: # (Vì `React.ReactNode` bao gồm:)

[//]: # (* `JSX.Element`)

[//]: # (* `string`)

[//]: # (* `number`)

[//]: # (* `boolean`)

[//]: # (* `null`)

[//]: # (* `undefined`)

[//]: # (* `React.Fragment`)

[//]: # (* mảng các phần tử React,...)

[//]: # ()
[//]: # (Đây là kiểu được dùng **chuẩn nhất trong React**, ví dụ trong props `children`.)

[//]: # ()
[//]: # (### 🔹 Tóm lại:)

[//]: # ()
[//]: # (| Mục đích                           | Nên dùng kiểu   |)

[//]: # (| ---------------------------------- | --------------- |)

[//]: # (| Chỉ nhận JSX                       | `JSX.Element`   |)

[//]: # (| Nhận cả text / fragment / mảng JSX |`React.ReactNode`|)

[//]: # (| Không dùng trong React             | `Element`       |)

[//]: # ()
[//]: # (---)

[//]: # (Để trả lời câu hỏi của bạn một cách rõ ràng, mình sẽ giải thích từng phần một:)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### 1. **DOM là gì?**)

[//]: # ()
[//]: # (**DOM &#40;Document Object Model&#41;** là một **mô hình dữ liệu dạng cây** đại diện cho cấu trúc của một trang web &#40;HTML, XML&#41;.)

[//]: # ()
[//]: # (* Mỗi **thẻ HTML** trở thành một **node** trong cây DOM.)

[//]: # (* JavaScript có thể tương tác với DOM để **thay đổi nội dung, cấu trúc, hay style** của trang web **mà không cần reload trang**.)

[//]: # ()
[//]: # (Ví dụ:)

[//]: # ()
[//]: # (```html)

[//]: # (<div id="root">)

[//]: # (  <h1>Hello World</h1>)

[//]: # (</div>)

[//]: # (```)

[//]: # ()
[//]: # (Trong DOM, `div#root` là node cha, `h1` là node con.)

[//]: # ()
[//]: # (### 2. **DOM trong React**)

[//]: # ()
[//]: # (React sử dụng **Virtual DOM &#40;DOM ảo&#41;** chứ không thao tác trực tiếp lên **real DOM**.)

[//]: # ()
[//]: # (* **Virtual DOM:** là một bản sao nhẹ của DOM thực tế, nằm trong bộ nhớ.)

[//]: # (* React **so sánh** Virtual DOM với DOM trước đó để tìm ra **những thay đổi cần thiết** &#40;diffing algorithm&#41;.)

[//]: # (* Sau đó, React **cập nhật chỉ những phần thay đổi** trên DOM thực tế, thay vì render lại toàn bộ trang.)

[//]: # ()
[//]: # (Ví dụ:)

[//]: # ()
[//]: # (```jsx)

[//]: # (const [count, setCount] = React.useState&#40;0&#41;;)

[//]: # ()
[//]: # (return &#40;)

[//]: # (  <div>)

[//]: # (    <p>{count}</p>)

[//]: # (    <button onClick={&#40;&#41; => setCount&#40;count + 1&#41;}>Tăng</button>)

[//]: # (  </div>)

[//]: # (&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (Khi `count` thay đổi, React:)

[//]: # ()
[//]: # (1. Cập nhật Virtual DOM.)

[//]: # (2. So sánh với Virtual DOM cũ.)

[//]: # (3. Chỉ update `<p>` trong DOM thật, không render lại `<button>`.)

[//]: # ()
[//]: # (### 3. **Tại sao phải có DOM &#40;và Virtual DOM&#41;?**)

[//]: # ()
[//]: # (* **DOM thực sự**: cần để trình duyệt hiển thị nội dung và cấu trúc web.)

[//]: # (* **Virtual DOM trong React**:)

[//]: # ()
[//]: # (    * **Hiệu suất:** giảm số lần thao tác trực tiếp với DOM, tránh re-render toàn bộ trang.)

[//]: # (    * **Dễ quản lý state:** React tự động cập nhật giao diện dựa trên dữ liệu &#40;`state`/`props`&#41;.)

[//]: # (    * **Code gọn gàng hơn:** bạn chỉ định giao diện mong muốn, React lo phần tối ưu update.)

[//]: # ()
[//]: # (### 4. **Tóm tắt**)

[//]: # ()
[//]: # (| Khái niệm   | Vai trò chính                                                         |)

[//]: # (| ----------- | --------------------------------------------------------------------- |)

[//]: # (| DOM thực tế | Hiển thị trang web, cho phép JS thao tác trực tiếp.                   |)

[//]: # (| Virtual DOM | Bản sao DOM trong React để tối ưu cập nhật giao diện.                 |)

[//]: # (| Tại sao cần | Giúp render nhanh, tránh thao tác DOM tốn kém, quản lý state dễ dàng. |)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### 🔹 1. `slice&#40;start, end&#41;` hoạt động theo quy tắc **“lấy từ start đến trước end”**)

[//]: # ()
[//]: # (* `start`: vị trí bắt đầu &#40;tính từ 0&#41;)

[//]: # (* `end`: **vị trí dừng**, nhưng **không bao gồm** phần tử ở vị trí đó)

[//]: # (  → nên **không cần trừ 1**, vì nó **tự dừng trước end** rồi.)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (### 1. `<Link>` trong React Router)

[//]: # ()
[//]: # (* `<Link>` là component của **react-router-dom**, thay thế cho `<a>`.)

[//]: # (* Ví dụ:)

[//]: # ()
[//]: # ()
[//]: # ( ```tsx)

[//]: # ( import { Link } from "react-router-dom";)

[//]: # ()
[//]: # ()
[//]: # ( <Link to="/login">Đăng nhập</Link>)

[//]: # ( ```)

[//]: # (* Khi click, React Router **chỉ đổi component bên trong** mà không reload trang.)

[//]: # (* Ưu điểm: nhanh hơn, giữ nguyên state, không gọi lại server tải cả trang.)

[//]: # ()
[//]: # ()
[//]: # (---)

[//]: # (### 2. `useNavigate` trong React Router)

[//]: # ()
[//]: # (* Dùng khi bạn muốn **chuyển trang bằng code** &#40;không cần người dùng click&#41;.)

[//]: # (* Ví dụ: sau khi đăng ký thành công thì tự động chuyển sang trang login:)

[//]: # ()
[//]: # ()
[//]: # ( ```tsx)

[//]: # ( import { useNavigate } from "react-router-dom";)

[//]: # ()
[//]: # ()
[//]: # ( const Register = &#40;&#41; => {)

[//]: # (   const navigate = useNavigate&#40;&#41;;)

[//]: # ()
[//]: # ()
[//]: # (   const handleRegister = &#40;&#41; => {)

[//]: # (     // gọi API đăng ký ở đây)

[//]: # (     // nếu thành công:)

[//]: # (     navigate&#40;"/login"&#41;; // tự động chuyển đến trang login)

[//]: # (   };)

[//]: # ()
[//]: # ()
[//]: # (   return &#40;)

[//]: # (     <button onClick={handleRegister}>Đăng ký</button>)

[//]: # (   &#41;;)

[//]: # ( };)

[//]: # ( ```)

[//]: # (* `navigate&#40;"/login"&#41;` = giống như click `<Link to="/login" />`, nhưng được thực hiện bằng **JS code** thay vì user click.)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # ()
[//]: # (* **`<Link>`** → Dùng cho liên kết nội bộ khi người dùng **click**.)

[//]: # (* **`navigate&#40;"/path"&#41;`** → Dùng để điều hướng **bằng code** &#40;ví dụ: sau khi đăng nhập/đăng ký thành công thì tự động chuyển trang&#41;.)

[//]: # ()
[//]: # ()
[//]: # ()
[//]: # (const tests = [{id: 1}, {id: 2}, {id: 3}];)

[//]: # (console.log&#40;tests.length&#41;;      // 3)

[//]: # (console.log&#40;tests[tests.length - 1]&#41;; // tests[2] → {id: 3})

[//]: # ()
[//]: # ()
[//]: # (=> phần tử cuối cùng)

[//]: # (### 3. Luồng sử dụng điển hình)

[//]: # ()
[//]: # ()
[//]: # (Người dùng click vào “Sửa” một bài test.)

[//]: # ()
[//]: # (- Dispatch:  dispatch&#40;setSelectedTest&#40;test&#41;&#41;;)

[//]: # ()
[//]: # (- Redux slice lưu bài test vào state.selectedTest.)

[//]: # ()
[//]: # (Component SectionAddTest hoặc TableQues sẽ lấy selectedTest từ store:)

[//]: # ()
[//]: # (const selectedTest = useAppSelector&#40;&#40;state&#41; => state.tests.selectedTest&#41;;)

[//]: # ()
[//]: # (Nếu selectedTest tồn tại, UI sẽ render thông tin bài test + bảng câu hỏi.)

[//]: # ()
[//]: # ()
[//]: # (Nói cách khác, reducer này chỉ để cập nhật bài test đang được thao tác trong store, rất tiện để nhiều component dùng chung dữ liệu này mà không cần truyền prop đi vòng vèo.)

[//]: # ()
[//]: # (- Mục đích của hàm handleChangeAnswer)

[//]: # ()
[//]: # (Trong modal thêm/sửa câu hỏi, mỗi câu hỏi có nhiều đáp án &#40;answers&#41;.)

[//]: # ()
[//]: # (Khi người dùng gõ text mới cho một đáp án, chúng ta cần cập nhật state answers tương ứng.)

[//]: # ()
[//]: # ()
[//]: # (Hàm này làm đúng điều đó: thay đổi text của một đáp án mà không ảnh hưởng các đáp án khác.)

[//]: # ()
[//]: # ()
[//]: # (## Tổng quan ngắn)

[//]: # ()
[//]: # (* **API file &#40;QuesApi / TestApi&#41;**: chứa `createAsyncThunk` hoặc hàm gọi HTTP &#40;axios&#41;. *Nhiệm vụ*: giao tiếp với backend, định nghĩa payload trả về.)

[//]: # (* **Slice &#40;QuesSlice / TestsSlice&#41;**: chứa reducer + trạng thái &#40;state&#41; + xử lý `extraReducers` cho các async-thunk. *Nhiệm vụ*: lưu/ cập nhật state trong Redux store.)

[//]: # (* **Store &#40;configureStore&#41;**: gộp tất cả slice vào 1 Store, cấu hình middleware.)

[//]: # (* **Hook &#40;useAppDispatch/useAppSelector&#41;**: wrapper typed cho `useDispatch` / `useSelector` &#40;TypeScript friendly&#41;.)

[//]: # (* **Component**: UI — sẽ **lấy data** từ store qua `useAppSelector`, **gọi action** bằng `dispatch&#40;thunk&#41;` và dùng local state cho form / modal khi cần.)

[//]: # ()
[//]: # (### Luồng dữ liệu &#40;flow&#41; — đơn giản và chuẩn)

[//]: # ()
[//]: # (1. Component &#40;UI&#41; gọi `dispatch&#40;getAllQues&#40;testId&#41;&#41;` &#40;ví dụ trong `useEffect`&#41;.)

[//]: # (2. `getAllQues` &#40;thunk trong API file&#41; gửi request `GET /tests/:testId`.)

[//]: # (3. Server trả về `test` &#40;hoặc `questionsDetail`&#41;, thunk `fulfilled` với payload.)

[//]: # (4. `QuesSlice.extraReducers` bắt `fulfilled` và cập nhật `state.list`.)

[//]: # (5. Component nhìn thấy `state.ques.list` &#40;qua `useAppSelector`&#41; → React re-render UI.)

[//]: # ()
[//]: # (Tương tự cho `addQues` / `updateQues` / `deleteQues`: component dispatch → thunk gọi API &#40;GET hiện trạng → PUT updatedTest&#41; → thunk fulfilled trả payload → slice cập nhật state → UI cập nhật.)

[//]: # ()
[//]: # (# Tại sao tách thành nhiều file? &#40;lý do/ lợi ích&#41;)

[//]: # ()
[//]: # (* **Tách rời trách nhiệm &#40;Separation of concerns&#41;**: API chỉ lo HTTP, slice chỉ lo state, component chỉ lo UI.)

[//]: # (* **Dễ test**: bạn có thể mock API trong unit test mà không động vào reducer, hoặc test reducer độc lập.)

[//]: # (* **Loại bỏ duplicate**: nhiều component cùng dùng `getAllQues` thay vì mỗi component viết axios riêng.)

[//]: # (* **Type-safety**: với TS, define type ở 1 chỗ => consistent.)

[//]: # ()
[//]: # (# Cụ thể từng file — làm gì, chứa gì, ví dụ)

[//]: # ()
[//]: # (### 1&#41; `src/apis/QuesApi.ts` — **API / Thunks**)

[//]: # ()
[//]: # ()
[//]: # (* **Mục đích**: gọi HTTP, xử lý payload trả về, định dạng trả về cho slice.)

[//]: # (* **Quan trọng**: khai báo generic cho `createAsyncThunk<TReturn, TArg>` để slice biết payload type.)

[//]: # (* **Ví dụ &#40;ít nhất cần có&#41;**:)

[//]: # ()
[//]: # ()
[//]: # (```ts)

[//]: # (// QuesApi.ts)

[//]: # (export const getAllQues = createAsyncThunk<Question[], number>&#40;)

[//]: # ( "ques/getAll",)

[//]: # ( async &#40;testId&#41; => {)

[//]: # (   const res = await axiosConfig.get&#40;`tests/${testId}`&#41;;)

[//]: # (   return res.data.questionsDetail || [];)

[//]: # ( })

[//]: # (&#41;;)

[//]: # ()
[//]: # ()
[//]: # (export const addQues = createAsyncThunk<Question, { testId: number; newQues: Question }>&#40;)

[//]: # ( "ques/add",)

[//]: # ( async &#40;{ testId, newQues }&#41; => {)

[//]: # (   const testRes = await axiosConfig.get&#40;`tests/${testId}`&#41;;)

[//]: # (   const test = testRes.data as TestDetail;)

[//]: # (   const updatedTest = { ...test, questionsDetail: [...&#40;test.questionsDetail||[]&#41;, newQues], questionCount: &#40;test.questionsDetail?.length||0&#41;+1 };)

[//]: # (   await axiosConfig.put&#40;`tests/${testId}`, updatedTest&#41;;)

[//]: # (   return newQues;)

[//]: # ( })

[//]: # (&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (**Lưu ý**: kiểu trả về của thunk phải khớp với `PayloadAction` bạn xử lý ở slice — nếu mismatch TypeScript sẽ báo lỗi &#40;ví dụ TS2769 bạn gặp&#41;.)

[//]: # ()
[//]: # (### 2&#41; `src/slices/QuesSlice.ts` — **Reducer / State**)

[//]: # ()
[//]: # (* **Mục đích**: lưu `list`, `status`, `error`, xử lý `pending/fulfilled/rejected` của các thunk.)

[//]: # (* **Ví dụ**:)

[//]: # ()
[//]: # (```ts)

[//]: # (const initialState: QuesState = { list: [], status: "idle", error: null };)

[//]: # ()
[//]: # ()
[//]: # (const QuesSlice = createSlice&#40;{)

[//]: # ( name: "ques",)

[//]: # ( initialState,)

[//]: # ( reducers: { resetQues: state => { state.list = []; state.status = "idle"; state.error = null; }},)

[//]: # ( extraReducers: &#40;builder&#41; => {)

[//]: # (   builder)

[//]: # (     .addCase&#40;getAllQues.pending, state => { state.status = "pending"; }&#41;)

[//]: # (     .addCase&#40;getAllQues.fulfilled, &#40;state, action: PayloadAction<Question[]>&#41; => {)

[//]: # (        state.status = "success"; state.list = action.payload;)

[//]: # (     }&#41;)

[//]: # (     .addCase&#40;getAllQues.rejected, &#40;state, action&#41; => {)

[//]: # (        state.status = "failed"; state.error = action.error.message || "Lỗi";)

[//]: # (     }&#41;)

[//]: # (     // addQues/updateQues/deleteQues fulfilled xử lý tương ứng...)

[//]: # ( })

[//]: # (}&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (### 3&#41; `src/store.ts` — **Configure store**)

[//]: # ()
[//]: # (* Gộp reducers, thêm middleware devtools.)

[//]: # ()
[//]: # (```ts)

[//]: # (import { configureStore } from "@reduxjs/toolkit";)

[//]: # (import { quesReducer } from "./slices/QuesSlice";)

[//]: # (import { testsReducer } from "./slices/TestsSlice";)

[//]: # ()
[//]: # ()
[//]: # (export const store = configureStore&#40;{)

[//]: # ( reducer: { ques: quesReducer, tests: testsReducer },)

[//]: # (}&#41;;)

[//]: # (export type RootState = ReturnType<typeof store.getState>;)

[//]: # (export type AppDispatch = typeof store.dispatch;)

[//]: # (```)

[//]: # (* **Provider**: ở `index.tsx` bọc `<Provider store={store}><App/></Provider>`.)

[//]: # ()
[//]: # (### 4&#41; `src/hooks/Hook.ts` — typed hooks)

[//]: # ()
[//]: # (* Giúp component dùng đúng type TS:)

[//]: # ()
[//]: # (```ts)

[//]: # (import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";)

[//]: # (import type { RootState, AppDispatch } from "../store";)

[//]: # ()
[//]: # ()
[//]: # (export const useAppDispatch = &#40;&#41; => useDispatch<AppDispatch>&#40;&#41;;)

[//]: # (export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;)

[//]: # (```)

[//]: # ()
[//]: # (* **Dùng trong component** thay vì raw `useDispatch/useSelector`.)

[//]: # ()
[//]: # (## Trong 1 component — bạn dùng cái gì, lấy gì từ đâu?)

[//]: # ()
[//]: # (**Component** thường cần 3 thứ:)

[//]: # ()
[//]: # (1. Dữ liệu để hiển thị → `const list = useAppSelector&#40;s => s.ques.list&#41;`)

[//]: # (2. Hành động / thay đổi dữ liệu → `const dispatch = useAppDispatch&#40;&#41;; dispatch&#40;getAllQues&#40;testId&#41;&#41;`)

[//]: # (3. Form/local UI state → useState / AntD `Form` &#40;không phải Redux nếu chỉ là tạm thời&#41;)

[//]: # ()
[//]: # (### Ví dụ `TableQues` &#40;ký tắt&#41;)

[//]: # ()
[//]: # (```tsx)

[//]: # (const TableQues = &#40;{ testId }&#41; => {)

[//]: # ( const dispatch = useAppDispatch&#40;&#41;;)

[//]: # ( const list = useAppSelector&#40;s => s.ques.list&#41;;)

[//]: # ( const status = useAppSelector&#40;s => s.ques.status&#41;;)

[//]: # ()
[//]: # ()
[//]: # ( useEffect&#40;&#40;&#41; => { if &#40;testId&#41; dispatch&#40;getAllQues&#40;testId&#41;&#41;; }, [dispatch, testId]&#41;;)

[//]: # ()
[//]: # ()
[//]: # ( const handleDelete = async &#40;id&#41; => {)

[//]: # (   try {)

[//]: # (     await dispatch&#40;deleteQues&#40;{ testId, quesId: id }&#41;&#41;.unwrap&#40;&#41;;)

[//]: # (     // unwrap sẽ ném lỗi nếu rejected -> catch)

[//]: # (     dispatch&#40;getAllQues&#40;testId&#41;&#41;; // reload)

[//]: # (   } catch &#40;err&#41; {)

[//]: # (     console.error&#40;err&#41;;)

[//]: # (   })

[//]: # ( };)

[//]: # ()
[//]: # ()
[//]: # ( return &#40;/* render table từ list, loading nếu status === 'pending' */&#41;)

[//]: # (})

[//]: # (```)

[//]: # (**Ghi chú**: `unwrap&#40;&#41;` rất hữu ích để lấy kết quả promise và bắt lỗi trong component nơi gọi.)

[//]: # ()
[//]: # (## Local state &#40;modal/form&#41; vs Redux state — khi nào dùng cái nào?)

[//]: # ()
[//]: # (* **Local state / Form state**: dùng cho input tạm, modal, draft — không cần chia sẻ toàn app. Ví dụ: nội dung textbox trong modal add question, checkbox chọn đúng.)

[//]: # (* **Redux state** &#40;global&#41;: dùng khi dữ liệu được dùng ở nhiều nơi hoặc phải tồn tại khi chuyển trang &#40;tests list, current selected test, questions list nếu được share nhiều component&#41;.)

[//]: # ()
[//]: # (**Pattern thực tế**:)

[//]: # ()
[//]: # (* Khi thêm câu hỏi **trước khi lưu test** &#40;test chưa có id&#41;: bạn thường lưu vào `currentTest.questionsDetail` ở component &#40;local state&#41; — chưa dispatch lên backend. Sau khi nhấn Save test → dispatch `addTest` &#40;backend&#41; với `questionsDetail`.)

[//]: # (* Khi test đã tồn tại &#40;id có thật&#41;, thao tác thêm/sửa/xóa câu hỏi có thể dispatch `addQues/updateQues/deleteQues` ngay để cập nhật backend và store.)

[//]: # ()
[//]: # (## Những lỗi thường gặp và cách debug nhanh)

[//]: # ()
[//]: # (* **TS type mismatch**: thunk trả về `{testId, ques}` nhưng slice xử lý `Question` → TS2769. → *fix*: khai báo generic cho thunk `createAsyncThunk<ReturnType, ArgType>` hoặc sửa reducer payload type cho khớp.)

[//]: # (* **Không re-render sau update**: reducer không trả về mảng mới &#40;mutating state sai&#41; → phải dùng immutable updates &#40;slice của RTK cho phép mutate an toàn, nhưng tránh gán object sai&#41;.)

[//]: # (* **API trả payload khác shape** → slice không cập nhật đúng → console.log action.payload trong `fulfilled` để kiểm tra.)

[//]: # (* **Checkbox trong Input.addonBefore không nhận click** → dùng `Input.Group` hoặc style `pointerEvents: 'auto'`.)

[//]: # (* **Thunks không dispatch lại list sau PUT** → component phụ thuộc `getAllQues` không reload -> phải dispatch getAllQues hoặc return new item and update slice accordingly.)

[//]: # ()
[//]: # (## Checklist khi viết 1 feature &#40;step-by-step&#41;)

[//]: # ()
[//]: # (1. **Định nghĩa types** &#40;`Question`, `TestDetail`, `QuesState`&#41; trong `types/type.ts`.)

[//]: # (2. **Viết API Thunks** &#40;`createAsyncThunk<ReturnType, ArgType>`&#41; trong `QuesApi.ts`. Trả về đúng shape mà slice mong đợi.)

[//]: # (3. **Viết Slice** &#40;initialState + extraReducers&#41; xử lý `pending/fulfilled/rejected`.)

[//]: # (4. **Config Store** &#40;combine reducers&#41;.)

[//]: # (5. **Hooks typed**: `useAppDispatch`, `useAppSelector`.)

[//]: # (6. **Component**: dùng `useAppSelector` để lấy state, `useAppDispatch` để dispatch thunk. Dùng `useEffect` để load dữ liệu khi component mount / testId thay đổi.)

[//]: # (7. **UI**: local state cho form/modal, gọi `onSave` callback hoặc `dispatch&#40;addQues&#41;` tuỳ logic.)

[//]: # (8. **Error handling**: dùng try/catch + `unwrap&#40;&#41;` để bắt lỗi từ thunk.)

[//]: # ()
[//]: # (## Ví dụ mini kết hợp &#40;tóm tắt&#41;)

[//]: # ()
[//]: # ()
[//]: # (**QuesApi.ts**)

[//]: # ()
[//]: # (```ts)

[//]: # (export const addQues = createAsyncThunk<Question, { testId:number; newQues: Question }>&#40;/*...*/&#41;;)

[//]: # (```)

[//]: # ()
[//]: # ()
[//]: # (**QuesSlice.ts**)

[//]: # ()
[//]: # (```ts)

[//]: # (.addCase&#40;addQues.fulfilled, &#40;state, action: PayloadAction<Question>&#41; => {)

[//]: # ( state.list.push&#40;action.payload&#41;;)

[//]: # (}&#41;;)

[//]: # (```)

[//]: # ()
[//]: # ()
[//]: # (**TableQues.tsx**)

[//]: # ()
[//]: # (```tsx)

[//]: # (const dispatch = useAppDispatch&#40;&#41;;)

[//]: # (useEffect&#40;&#40;&#41;=>{ dispatch&#40;getAllQues&#40;testId&#41;&#41;; }, [testId]&#41;;)

[//]: # ()
[//]: # ()
[//]: # (const onAdd = async &#40;newQ&#41; => {)

[//]: # ( await dispatch&#40;addQues&#40;{ testId, newQ }&#41;&#41;.unwrap&#40;&#41;;)

[//]: # ( // slice đã push question => list updated, UI re-renders)

[//]: # (};)

[//]: # (```)

[//]: # ()
[//]: # (## Kết luận ngắn)

[//]: # ()
[//]: # (* **API file** = gọi backend & định nghĩa payload.)

[//]: # (* **Slice** = lưu và biến đổi state theo payload của API.)

[//]: # (* **Store** = gộp slice, cấu hình.)

[//]: # (* **Hooks** = typed dispatch/selector cho component.)

[//]: # (* **Component** = UI, lấy state bằng selector, thay đổi state bằng dispatch&#40;thunk&#41; hoặc local state.)

[//]: # ()
[//]: # (| Thành phần                              | Vai trò                                                                 |)

[//]: # (| --------------------------------------- | ----------------------------------------------------------------------- |)

[//]: # (| `createAsyncThunk`                      | Tạo một thunk &#40;hàm async có thể dispatch&#41;.                              |)

[//]: # (| `"dashboard/fetchTests"`                | Tên action, Redux dùng để log/tracking.                                 |)

[//]: # (| `async &#40;&#41; => {...}`                     | Hàm async gọi API thực tế.                                              |)

[//]: # (| `axios.get&#40;"..."&#41;`                      | Gửi request đến backend.                                                |)

[//]: # (| `return response.data as TestDetail[];` | Trả về dữ liệu đã định kiểu &#40;giúp TypeScript biết chính xác dạng data&#41;. |)

[//]: # ()
[//]: # (###  Luồng hoạt động tổng quát)

[//]: # ()
[//]: # (```)

[//]: # (Component &#40;Dashboard&#41;)

[//]: # (   ↓)

[//]: # (dispatch&#40;fetchTests&#40;&#41;&#41;)

[//]: # (   ↓)

[//]: # (createAsyncThunk tự dispatch 3 action:)

[//]: # (  - pending)

[//]: # (  - fulfilled)

[//]: # (  - rejected)

[//]: # (   ↓)

[//]: # (Reducer &#40;dashboardSlice&#41;)

[//]: # (   - pending: set loading = true)

[//]: # (   - fulfilled: cập nhật state.tests = payload)

[//]: # (   - rejected: set error)

[//]: # (   ↓)

[//]: # (UI tự rerender theo state mới)

[//]: # (```)

[//]: # ()
[//]: # (**Mục đích:** chứa các **hàm gọi API** &#40;HTTP request&#41; đến server &#40;thường dùng `axios`&#41;. )

[//]: # (Ở đây chỉ lo **giao tiếp server** — **không xử lý state**.)

[//]: # ()
[//]: # (##  2. File **Slice** &#40;ví dụ: `CategoriesSlice.ts`&#41;)

[//]: # ()
[//]: # (**Mục đích:** là **trái tim Redux Toolkit**, chứa:)

[//]: # (* **State ban đầu** &#40;`initialState`&#41;)

[//]: # (* **Reducers** &#40;synchronous actions&#41;)

[//]: # (* **ExtraReducers** &#40;xử lý bất đồng bộ từ `createAsyncThunk`&#41;)

[//]: # (* **Export các action và reducer**)

[//]: # ()
[//]: # (##  5. Luồng hoạt động tổng thể)

[//]: # (```)

[//]: # (Component → dispatch&#40;fetchCategories&#40;&#41;&#41;)

[//]: # (       ↓)

[//]: # (createAsyncThunk → gọi hàm trong API &#40;axios&#41;)

[//]: # (       ↓)

[//]: # (Khi API xong → dispatch tự động 3 case: pending / fulfilled / rejected)

[//]: # (       ↓)

[//]: # (ExtraReducers trong Slice → cập nhật state &#40;loading/data/error&#41;)

[//]: # (       ↓)

[//]: # (useSelector&#40;...&#41; trong Component → render dữ liệu ra UI)

[//]: # (```)

[//]: # ()
[//]: # (##   Luồng hoạt động y hệt Redux chuẩn:)

[//]: # ()
[//]: # ()
[//]: # (```)

[//]: # (Component → dispatch&#40;fetchCategories&#40;&#41;&#41;)

[//]: # (       ↓)

[//]: # (fetchCategories &#40;createAsyncThunk trong file api&#41;)

[//]: # (       ↓)

[//]: # (Slice extraReducers xử lý kết quả)

[//]: # (       ↓)

[//]: # (State cập nhật → useSelector → hiển thị ra UI)
```