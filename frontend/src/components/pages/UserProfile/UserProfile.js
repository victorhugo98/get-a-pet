import React from "react";
import styles from "../Auth/Form.module.css";
import Input from "../../form/Input";
import NoProfilePicture from "../../../utils/img/NoProfilePicture.png";
import RoundedImage from "../../roundedImage/RoundedImage";
import useForm from "../../../hooks/useForm/useForm";
import GreenButton from "../../greenButton/GreenButton";
import { CHECK_USER, UPDATE_USER } from "../../../utils/api/api";
import useFetch from "../../../hooks/useForm/useFetch";
import UserProfileSkeleton from "./UserProfileSkeleton";

const UserProfile = () => {
  const formData = new FormData();

  const [preview, setPreview] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const [noValidatePassword, setNoValidatePassword] = React.useState(true);

  const {
    data: userProfileData,
    loading: loadingProfileData,
    request: requestProfileData,
  } = useFetch();
  const updateUser = useFetch();

  const email = useForm("email", userProfileData?.currentUser.email);
  const name = useForm(false, userProfileData?.currentUser.name);
  const phone = useForm("number", userProfileData?.currentUser.phone);
  const password = useForm(noValidatePassword ? "noValidate" : "password");
  const confirmPassword = useForm(
    noValidatePassword ? "noValidate" : "password"
  );

  function handleFileChange(e) {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  }

  React.useEffect(() => {
    if (userProfileData) {
      const userImage = userProfileData.currentUser.image;
      if (userImage)
        setPreview(`http://localhost:5000/images/users/${userImage}`);
    }
  }, [userProfileData]);

  React.useEffect(() => {
    async function getUserData() {
      const token = localStorage.token;
      const { url, options } = CHECK_USER(token);
      await requestProfileData(url, options);
    }
    getUserData();
  }, [requestProfileData]);

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.token;

    if (image) formData.append("image", image);
    formData.append("name", name.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value);
    formData.append("password", password.value);
    formData.append("confirmPassword", confirmPassword.value);

    if (!password.value && !confirmPassword.value) {
      if (name.validate() && email.validate() && phone.validate()) {
        const { url, options } = UPDATE_USER(token, formData);
        await updateUser.request(url, options);
      }
    } else {
      if (
        name.validate() &&
        email.validate() &&
        phone.validate() &&
        password.validate() &&
        confirmPassword.validate()
      ) {
        const { url, options } = UPDATE_USER(token, formData);
        await updateUser.request(url, options);
      }
    }
  }

  const handleValidatePassword = React.useCallback(() => {
    if (!password.value && !confirmPassword.value) {
      setNoValidatePassword(true);
      password.setError(null);
      confirmPassword.setError(null);
      return;
    }
    if (password.value || confirmPassword.value) {
      setNoValidatePassword(false);
    }
  }, [confirmPassword, password]);

  React.useEffect(() => {
    handleValidatePassword();
  }, [handleValidatePassword]);

  if (loadingProfileData) return <UserProfileSkeleton />;
  if (userProfileData)
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Editar</h1>
        {preview ? (
          <RoundedImage src={preview} />
        ) : (
          <img src={NoProfilePicture} alt="Foto de perfil" />
        )}

        {}
        <Input type="file" id="image" onChange={handleFileChange} />

        <Input
          label="Nome"
          id="name"
          type="text"
          placeholder="Digite o nome"
          {...name}
        />

        <Input
          label="Email"
          id="email"
          type="text"
          placeholder="Digite a email"
          {...email}
        />
        <Input
          label="Telefone"
          id="phone"
          type="text"
          placeholder="(00)00000-0000"
          {...phone}
        />
        <Input
          label="Senha"
          id="password"
          type="password"
          placeholder="Digite a senha"
          {...password}
        />
        <Input
          label="Confirmar senha"
          id="confirmPassword"
          type="password"
          placeholder="Confirme a senha"
          {...confirmPassword}
        />
        <GreenButton disabled={updateUser.loading ? true : false}>
          Editar
        </GreenButton>
      </form>
    );
};

export default UserProfile;
