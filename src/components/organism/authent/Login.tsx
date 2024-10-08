import {TextInput} from "@atom/inputs/TextInput.tsx";
import {IconUser} from "@icons/IconUser.tsx";
import {IconPassword} from "@icons/IconPassword.tsx";
import {Button} from "@atom/buttons/Button.tsx";
import {Card} from "@molecule/Card.tsx";
import {Field, Form, Formik, FormikProps} from "formik";
import * as Yup from 'yup';

export function Login() {
    return (
        <>
            <Card title="Connexion">
                <Formik
                    initialValues={{username: '', password: ''}}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .max(10, '10 caractères max')
                            .min(2, '2 caractères min')
                            .required('Veuillez saisir un nom d\'utilisateur'),
                        password: Yup.string()
                            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "8 caractères minimum avec une lettre et un chiffre")
                            .required("Veuillez saisir votre mot de passe")

                    })}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 1000);
                    }}>
                    {(props: FormikProps<any>) => (
                        <Form>
                            <Field name="username" type="text" placeholder="Nom d'utilisateur" icon={<IconUser />} component={TextInput} />
                            <Field name="password" type="password" placeholder="Mot de passe" icon={<IconPassword />} component={TextInput} />
                            <Button type="submit" label="Se connecter" />
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    );
}