const UserProfile = ({ name, age, onAgeChange }) => {
  return (
    <>
      <h1>User Profile</h1>
      <p>name: {name}</p>
      <p>age:{age}</p>
      <button onClick={onAgeChange}>增加年龄</button>
    </>
  );
};

export default UserProfile;
