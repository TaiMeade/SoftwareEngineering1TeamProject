interface UserFormProps {
  bio: string | null;
  userImage: string | null | undefined;
  username: string | null;
  password: string | null;
}

const UpdateUserForm: React.FC<UserFormProps> = ({
  bio,
  userImage,
  password,
  username,
}) => {
  return (
    <div className="flex flex-col gap-12 pt-4">
      <h1 className="text-4xl font-bold">User Settings Page</h1>

      {/* Change Bio, Update User Image, Modify Nickname, Change Password */}
      <form className="flex w-full max-w-3xl flex-col items-start gap-12 [&>div]:w-full">
        <div className="flex flex-col gap-4">
          <label htmlFor="bio" className="text-2xl font-bold">
            Change Bio
          </label>
          <textarea
            id="bio"
            defaultValue={bio || ""}
            className="icook-form-textarea"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="user-image" className="text-2xl font-bold">
            Update User Image
          </label>
          <input id="user-image" type="file" />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="username" className="text-2xl font-bold">
            Modify Username
          </label>
          <input
            id="username"
            defaultValue={username || ""}
            type="text"
            className="icook-form-input"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="password" className="text-2xl font-bold">
            Change Password
          </label>
          <input
            id="password"
            defaultValue={password || ""}
            type="password"
            className="icook-form-input"
          />
        </div>
        <div className="flex flex-col gap-4">
          <button type="submit" className="icook-button">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
