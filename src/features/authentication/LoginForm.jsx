import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import Spinner from "@/ui/Spinner";

function LoginForm() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {},
  });
  const { login, isPending } = useLogin();

  const { errors } = formState;

  function onSubmit(data) {
    const { username, password } = data;
    login({ username, password });
  }

  return (
    <div className="min-w-sm mx-auto my-0 flex max-w-md items-center justify-center rounded-lg border-[1px] border-solid border-slate-300 bg-white p-8 shadow-sm shadow-slate-200">
      <div className="flex w-full flex-col gap-4">
        <h1 className="text-left text-2xl font-bold">Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <FormRow
              label="Tài khoản"
              error={errors?.username?.message}
              small={true}
            >
              <Input
                type="text"
                name="username"
                id="username"
                {...register("username", {
                  required: "Tài khoản không được để trống",
                })}
              />
            </FormRow>
            <FormRow
              label="Mật khẩu"
              error={errors?.password?.message}
              small={true}
            >
              <Input
                type="password"
                name="password"
                id="password"
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                })}
              />
            </FormRow>
          </div>
          <div className="mt-2 flex items-center justify-center">
            <button className="flex h-[2.625rem] min-w-28 items-center justify-center rounded-md border-[1px] border-solid border-slate-300 px-4 py-2 transition-colors hover:bg-slate-600 hover:text-slate-200 disabled:bg-slate-200 disabled:text-slate-500">
              {isPending ? <Spinner /> : "Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
