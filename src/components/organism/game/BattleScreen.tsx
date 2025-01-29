import {Button} from "@atom/buttons/Button.tsx";

export function BattleScreen() {
    // Définition du bouton de lancement de combat
    const startBattleHandler = () => {
        console.log("Battle start !")}

    return (
        <>
            <div className="card bg-base-100 w-full shadow-xl">
                <Button btnWidth={'btn-wide'}
                        type={'button'}
                        level={'primary'}
                        label={'Start battle !'}
                        click={startBattleHandler}
                        disabled={'btn-disabled'}
                />
            </div>
        </>
    );
}