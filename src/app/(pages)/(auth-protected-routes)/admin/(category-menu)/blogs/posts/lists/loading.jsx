import { ClipLoader } from "react-spinners";

const loading = () => {
  return (
    <div className="flex w-full items-center justify-center min-h-full">
      <ClipLoader size={36} />
    </div>
  );
};

export default loading;
