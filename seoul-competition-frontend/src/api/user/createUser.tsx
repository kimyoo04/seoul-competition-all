import axios from "@api/axiosInstance";
import { IUserForm } from "@type/userForm";

// jwt를 쿠키에 저장 요청
export default async function creatUser(formData: IUserForm) {
  try {
    const { gender, age, location, interest } = formData;
    const data = { gender, age, location, interest };
    await axios.post("/user", data);
    return true;
  } catch (err) {
    console.log("🚀createUser error", err);
    return false;
  }
}
