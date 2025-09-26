import { UserTable } from "@/components/adminComponents/table/UsersTable";
import { getAllUsersAPI } from "@/service/adminService/user.service";


const UsersPage = async () => {
  const users = await getAllUsersAPI();

  return (
    <div className="max-w-5xl">
      <UserTable data={users} />
    </div>
  );
};

export default UsersPage;
