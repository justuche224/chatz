import CardWrapper from "../auth/CardWrapper";

export const AccountCreatedModal = () => {
  return (
    <section className="min-h-screen w-full fixed left-0 top-0 bg-[#0000007e] z-[997] flex flex-col justify-center items-center backdrop-blur-lg">
      <CardWrapper
        headerLabel="Account Created"
        backButtonLable="Back to login"
        backButtonHref="/auth/login"
      >
        <h1>
          A verification link has been sent to your email. Please check your
          inbox to activate your account.
        </h1>
      </CardWrapper>
    </section>
  );
};

export const PasswordResetModal = () => {
  return (
    <section className="min-h-screen w-full fixed left-0 top-0 bg-[#0000007e] z-[997] flex flex-col justify-center items-center backdrop-blur-lg">
      <CardWrapper
        headerLabel="Link sent!"
        backButtonLable="Back to login"
        backButtonHref="/auth/login"
      >
        <h1>
          A link to reset your password has been sent to your email. Please
          check your inbox to reset your password.
        </h1>
      </CardWrapper>
    </section>
  );
};

export const PasswordResetSuccessfulModal = () => {
  return (
    <section className="min-h-screen w-full fixed left-0 top-0 bg-[#0000007e] z-[997] flex flex-col justify-center items-center backdrop-blur-lg">
      <CardWrapper
        headerLabel="Password Changed Successfuly!"
        backButtonLable="Back to login"
        backButtonHref="/auth/login"
      >
        <h1>You&apos;ve Successfuly updated your password!</h1>
      </CardWrapper>
    </section>
  );
};
