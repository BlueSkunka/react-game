import {Card} from "@molecule/Card.tsx";
import {Field, Form, Formik} from "formik";
import {IconUser} from "@atom/icons/IconUser.tsx";
import {TextInput} from "@atom/inputs/TextInput.tsx";
import {useContext, useEffect, useState} from "react";
import {PokemonInterface} from "@interfaces/PokemonInterface.ts";
import {ComponentLogEnums} from "../../../enums/ComponentLogEnums.ts";
import {listPokemon} from "@services/pokemon/pokemonService.ts";
import {AuthContext} from "@contexts/AuthContext.tsx";
import {SocketContext} from "@contexts/SocketContext.tsx";
import {MessageLevelEnum} from "../../../enums/MessageLevelEnum.ts";
import {PokemonAttackInterface} from "@interfaces/PokemonAttackInterface.ts";
import {listAttacksByPokemon} from "@repositories/pokemonAttacksRepository.ts";
import Element = React.JSX.Element;
import * as Yup from 'yup';
import {Button} from "@atom/buttons/Button.tsx";

export function BuildTeam() {
    const {token} = useContext(AuthContext)
    const {sendToast} = useContext(SocketContext)
    const [pokemonList, setPokemonList] = useState<PokemonInterface[]>([])
    const [pokemonOne, setPokemonOne] = useState<PokemonInterface>()
    const [pokemonOneAttacks, setPokemonOneAttacks] = useState<PokemonAttackInterface[]>([])
    const [pokemonTwo, setPokemonTwo] = useState<PokemonInterface>()
    const [pokemonTwoAttacks, setPokemonTwoAttacks] = useState<PokemonAttackInterface[]>([])
    const [pokemonThree, setPokemonThree] = useState<PokemonInterface>()
    const [pokemonThreeAttacks, setPokemonThreeAttacks] = useState<PokemonAttackInterface[]>([])

    useEffect(() => {
        console.log(ComponentLogEnums.MOUNTING)
        listPokemons()
    }, []);

    async function listPokemons() {
        const response = await listPokemon(token)
        console.log("Listing pokemons", response)
        if (response.error) {
            sendToast(response.error, MessageLevelEnum.DANGER)
        } else {
            const list: PokemonInterface[] = response
            setPokemonList(list)
        }

    }

    //region Pokemon select handlers
    async function pokemonOneSelectedHandler(event) {
        console.log("pokemon selected", event.target.value)

        const response = await listAttacksByPokemon(token, event.target.value)
        console.log(response)
        if (response.error) {
            sendToast(response.message, MessageLevelEnum.DANGER)
        } else {
            const attacks: PokemonAttackInterface[] = response
            setPokemonOne(getPokemon(event.target.value))
            setPokemonOneAttacks(attacks)
        }
    }

    async function pokemonTwoSelectedHandler(event) {
        console.log("pokemon selected", event.target.value)

        const response = await listAttacksByPokemon(token, event.target.value)
        console.log(response)
        if (response.error) {
            sendToast(response.message, MessageLevelEnum.DANGER)
        } else {
            const attacks: PokemonAttackInterface[] = response
            setPokemonTwo(getPokemon(event.target.value))
            setPokemonTwoAttacks(attacks)
        }
    }

    async function pokemonThreeSelectedHandler(event) {
        console.log("pokemon selected", event.target.value)

        const response = await listAttacksByPokemon(token, event.target.value)
        console.log(response)
        if (response.error) {
            sendToast(response.message, MessageLevelEnum.DANGER)
        } else {
            const attacks: PokemonAttackInterface[] = response
            setPokemonThree(getPokemon(event.target.value))
            setPokemonThreeAttacks(attacks)
        }
    }
    //endregion

    function getPokemon(id: string) {
        return pokemonList.find((pkmn) => pkmn.id === id)
    }

    //region Build pokemon options for formik
    const optionsPokemon: Element[] = [];
    optionsPokemon.push(
        <option key={0} value={0} disabled={'disabled'} selected={'selected'}>
            Pick a pokemon !
        </option>
    )
    pokemonList.forEach((pkmn) => {
        optionsPokemon.push(
            <option key={pkmn.id} value={pkmn.id}>
                {pkmn.name}
            </option>
        )
    })
    //endregion

    //region Build Pokemon attacks options for Formik
    const optionsPokemonOneAttacks: Element[] = []
    optionsPokemonOneAttacks.push(
        <option key={0} value={0} disabled={true} selected={true}>
            Pick an attack !
        </option>
    )
    pokemonOneAttacks.forEach((attack) => {
        optionsPokemonOneAttacks.push(
            <option key={attack.id} value={attack.id}>
                {attack.name}
            </option>
        )
    })

    const optionsPokemonTwoAttacks: Element[] = []
    optionsPokemonTwoAttacks.push(
        <option key={0} value={0} disabled={true} selected={true}>
            Pick an attack !
        </option>
    )
    pokemonTwoAttacks.forEach((attack) => {
        optionsPokemonTwoAttacks.push(
            <option key={attack.id} value={attack.id}>
                {attack.name}
            </option>
        )
    })

    const optionsPokemonThreeAttacks: Element[] = []
    optionsPokemonThreeAttacks.push(
        <option key={0} value={0} disabled={true} selected={true}>
            Pick an attack !
        </option>
    )
    pokemonThreeAttacks.forEach((attack) => {
        optionsPokemonThreeAttacks.push(
            <option key={attack.id} value={attack.id}>
                {attack.name}
            </option>
        )
    })
    //endregion

    const submitHandler = (values: any) => {
        console.log("submitted", values)
    }

    return (
        <>
            <div className="container">

                <h2>Build a team !</h2>
                <Formik
                    initialValues={{
                        name: '',
                        pokemon_one: '',
                        pokemon_one_attack_one: '',
                        pokemon_one_attack_two: '',
                        pokemon_one_attack_three: '',
                        pokemon_one_attack_four: '',
                        pokemon_two: '',
                        pokemon_two_attack_one: '',
                        pokemon_two_attack_two: '',
                        pokemon_two_attack_three: '',
                        pokemon_two_attack_four: '',
                        pokemon_three: '',
                        pokemon_three_attack_one: '',
                        pokemon_three_attack_two: '',
                        pokemon_three_attack_three: '',
                        pokemon_three_attack_four: '',
                    }}
                    enableReinitialize={true}
                    onSubmit={(values) => {submitHandler(values)}}
                    validationSchema={Yup.object({
                        name: Yup.string().required("Veuillez choisir un nom d'équipe"),
                        pokemon_one: Yup.string().required("Please choose a pokemon"),
                        pokemon_one_attack_one: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_one_attack_two'), Yup.ref('pokemon_one_attack_three'), Yup.ref('pokemon_one_attack_four')], 'Please choose non similar attacks'),
                        pokemon_one_attack_two: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_one_attack_one'), Yup.ref('pokemon_one_attack_three'), Yup.ref('pokemon_one_attack_four')], 'Please choose non similar attacks'),
                        pokemon_one_attack_three: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_one_attack_one'), Yup.ref('pokemon_one_attack_two'), Yup.ref('pokemon_one_attack_four')], 'Please choose non similar attacks'),
                        pokemon_one_attack_four: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_one_attack_one'), Yup.ref('pokemon_one_attack_two'), Yup.ref('pokemon_one_attack_three')], 'Please choose non similar attacks'),
                        pokemon_two: Yup.string().required("Please choose a pokemon"),
                        pokemon_two_attack_one: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_two_attack_two'), Yup.ref('pokemon_two_attack_three'), Yup.ref('pokemon_two_attack_four')], 'Please choose non similar attacks'),
                        pokemon_two_attack_two: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_two_attack_one'), Yup.ref('pokemon_two_attack_three'), Yup.ref('pokemon_two_attack_four')], 'Please choose non similar attacks'),
                        pokemon_two_attack_three: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_two_attack_one'), Yup.ref('pokemon_two_attack_two'), Yup.ref('pokemon_two_attack_four')], 'Please choose non similar attacks'),
                        pokemon_two_attack_four: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_two_attack_one'), Yup.ref('pokemon_two_attack_two'), Yup.ref('pokemon_two_attack_three')], 'Please choose non similar attacks'),
                        pokemon_three: Yup.string().required("Please choose a pokemon"),
                        pokemon_three_attack_one: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_three_attack_two'), Yup.ref('pokemon_three_attack_three'), Yup.ref('pokemon_three_attack_four')], 'Please choose non similar attacks'),
                        pokemon_three_attack_two: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_three_attack_one'), Yup.ref('pokemon_three_attack_three'), Yup.ref('pokemon_three_attack_four')], 'Please choose non similar attacks'),
                        pokemon_three_attack_three: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_three_attack_one'), Yup.ref('pokemon_three_attack_two'), Yup.ref('pokemon_three_attack_four')], 'Please choose non similar attacks'),
                        pokemon_three_attack_four: Yup.string()
                            .required("Please choose an attack")
                            .notOneOf([Yup.ref('pokemon_three_attack_one'), Yup.ref('pokemon_three_attack_two'), Yup.ref('pokemon_three_attack_three')], 'Please choose non similar attacks'),
                    })}
                >
                    <Form className={'space-y-4'}>
                        <div className={'flex flex-col-reverse justify-between md:lg:flex-row'}>
                            <Field name={"name"} type={"text"} placeholder={"Team name"} icon={<IconUser />} component={TextInput} className={"basis-3/4 mt-2"}/>
                            <Button btnWidth={'btn-wide'} type={'submit'} level={'success'} label={'Save'} click={() => {} } disabled={''} />
                        </div>
                        <div className="card bg-base-100 w-full shadow-xl p-4">
                            <section id="pokemon_one" className={'flex'}>
                                <section id={'pokemon_one_form'} className={'space-y-4'}>
                                    <p>First Pokemon</p>
                                    <Field name={"pokemon_one"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} onChange={pokemonOneSelectedHandler} className={"select select-bordered w-full max-w-xs"}>
                                        {optionsPokemon}
                                    </Field>
                                    <div className="flex md:lg:space-x-4 space-y-2 md:lg:space-y-0 flex-wrap md:lg:flex-row md:lg:flex-nowrap">
                                        <Field name={"pokemon_one_attack_one"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonOneAttacks}
                                        </Field>
                                        <Field name={"pokemon_one_attack_two"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonOneAttacks}
                                        </Field>
                                        <Field name={"pokemon_one_attack_three"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonOneAttacks}
                                        </Field>
                                        <Field name={"pokemon_one_attack_four"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonOneAttacks}
                                        </Field>
                                    </div>
                                </section>
                                <section id="pokemon_one_image" className={'hidden md:lg:flex'}>
                                    <img src={`/sprites/${pokemonOne?.sprite}_front.png`} alt={pokemonOne?.name}/>
                                </section>
                            </section>
                        </div>

                        <div className="card bg-base-100 w-full shadow-xl p-4">
                            <section id="pokemon_two" className={'flex'}>
                                <section id={'pokemon_two_form'} className={'space-y-4'}>
                                    <p>First Pokemon</p>
                                    <Field name={"pokemon_two"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} onChange={pokemonTwoSelectedHandler} className={"select select-bordered w-full max-w-xs"}>
                                        {optionsPokemon}
                                    </Field>
                                    <div className="flex md:lg:space-x-4 space-y-2 md:lg:space-y-0 flex-wrap md:lg:flex-row md:lg:flex-nowrap">
                                        <Field name={"pokemon_two_attack_one"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonTwoAttacks}
                                        </Field>
                                        <Field name={"pokemon_two_attack_two"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonTwoAttacks}
                                        </Field>
                                        <Field name={"pokemon_two_attack_three"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonTwoAttacks}
                                        </Field>
                                        <Field name={"pokemon_two_attack_four"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonTwoAttacks}
                                        </Field>
                                    </div>
                                </section>
                                <section id="pokemon_two_image" className={'hidden md:lg:flex'}>
                                    <img src={`/sprites/${pokemonTwo?.sprite}_front.png`} alt={pokemonTwo?.name}/>
                                </section>
                            </section>
                        </div>

                        <div className="card bg-base-100 w-full shadow-xl p-4">
                            <section id="pokemon_three" className={'flex'}>
                                <section id={'pokemon_three_form'} className={'space-y-4'}>
                                    <p>First Pokemon</p>
                                    <Field name={"pokemon_three"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} onChange={pokemonThreeSelectedHandler} className={"select select-bordered w-full max-w-xs"}>
                                        {optionsPokemon}
                                    </Field>
                                    <div className="flex md:lg:space-x-4 space-y-2 md:lg:space-y-0 flex-wrap md:lg:flex-row md:lg:flex-nowrap">
                                        <Field name={"pokemon_three_attack_one"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonThreeAttacks}
                                        </Field>
                                        <Field name={"pokemon_three_attack_two"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonThreeAttacks}
                                        </Field>
                                        <Field name={"pokemon_three_attack_three"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonThreeAttacks}
                                        </Field>
                                        <Field name={"pokemon_three_attack_four"} type={"select"} placeholder={"Choisir un pokémon"} icon={<IconUser />} as={"select"} className={"select select-bordered w-full max-w-xs"}>
                                            {optionsPokemonThreeAttacks}
                                        </Field>
                                    </div>
                                </section>
                                <section id="pokemon_three_image" className={'hidden md:lg:flex'}>
                                    <img src={`/sprites/${pokemonThree?.sprite}_front.png`} alt={pokemonThree?.name}/>
                                </section>
                            </section>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}