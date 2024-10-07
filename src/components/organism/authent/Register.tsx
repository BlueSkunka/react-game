import {Card} from "../../molecule/Card.tsx";
import {TextInput} from "../../atom/inputs/TextInput.tsx";
import {IconUser} from "../../icons/IconUser.tsx";
import {IconPassword} from "../../icons/IconPassword.tsx";
import {ButtonSubmit} from "../../atom/buttons/ButtonSubmit.tsx";
import {IconEmail} from "../../icons/IconEmail.tsx";

export function Register() {
    return (
        <>
            <Card title="Inscription">
                <TextInput type="text" placeholder="Nom" icon={<IconUser />} />
                <TextInput type="text" placeholder="Prénom" icon={<IconUser />} />
                <TextInput type="text" placeholder="Email" icon={<IconEmail />} />
                <TextInput type="text" placeholder="Nom d'utilisateur" icon={<IconUser/>}/>
                <TextInput type="password" placeholder="Mot de passe" icon={<IconPassword/>}/>
                <ButtonSubmit label="S'inscrire" />
            </Card>
        </>
    );
}
