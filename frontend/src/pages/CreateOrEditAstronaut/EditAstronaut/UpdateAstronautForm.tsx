import { FormEvent, useState, useRef } from 'react';

import classnames from 'classnames';

import { HUDWindow } from '@components/HUDWindow';
import { Form } from '@components/Form';
import { HUDInput } from '@components/HUDInput';
import { HUDButton } from '@components/HUDButton';
import { Flexbox } from '@components/Flexbox';
import { Astronaut } from '@api/astronaut.api';

import styles from '../AstronautForm.module.css';
import { AutoCompleteOptionType } from '@components/HUDAutoComplete';
import { useNavigate } from 'react-router-dom';
import { useUpdateAstronaut } from './hooks/useUpdateAstronaut';
import { AstronautToUpdate } from './services/AstronautToUpdate';
import { PlanetAutoComplete } from './components/PlanetAutoComplete';

type AstronautFormProps = {
  astronautForUpdate: Astronaut;
};

type FormStateType = {
  firstname?: string;
  lastname?: string;
  planet?: string;
};

export function UpdateAstronautForm({ astronautForUpdate }: Readonly<AstronautFormProps>) {
  const componentClassNames = classnames(styles.astronautform, styles.createoreditastronautForm);
  const navigate = useNavigate();
  const handleCancel = () => navigate('/spaceship-admin');
  const { updateAstronaut } = useUpdateAstronaut();
  const handleAstronautFormSubmit = async (astronaut: AstronautToUpdate) => {
    await updateAstronaut(astronaut);
    navigate('/spaceship-admin');
  };

  const [formState, setFormState] = useState<FormStateType>({});

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const originPlanetRef = useRef<HTMLInputElement>(null);

  const validateAndSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: FormStateType = {};
    const astronautFirstname = firstnameRef.current?.value;
    const astronautLastname = lastnameRef.current?.value;
    const astronautOriginPlanet = originPlanetRef.current?.value;

    if (astronautFirstname === '') {
      validationErrors.firstname = 'firstname is required';
    }
    if (astronautLastname === '') {
      validationErrors.lastname = 'lastname is require';
    }
    if (astronautOriginPlanet === '') {
      validationErrors.planet = 'planet is require';
    }
    if (
      !Object.keys(validationErrors).length &&
      astronautFirstname &&
      astronautLastname &&
      astronautOriginPlanet
    ) {
      handleAstronautFormSubmit({
        id: 1,
        firstname: astronautFirstname,
        lastname: astronautLastname,
        originPlanetId: parseInt(astronautOriginPlanet),
      });
    } else {
      setFormState(validationErrors);
    }
  };

  const options = (searchTerm?: string): AutoCompleteOptionType[] => {
    const planets = [
      {
        id: 1,
        name: 'Donut Factory',
        isHabitable: true,
        description: 'Forte en calories',
        image: {
          path: '/assets/donut_factory.jpg',
          name: 'Donut Factory Image',
        },
      },
      {
        id: 11,
        name: 'pouloulou',
        isHabitable: false,
        description: 'description 4',
        image: {
          path: '/assets/donut_factory.jpg',
          name: 'Donut Factory Image',
        },
      },
      {
        id: 12,
        name: 'pouloulou',
        isHabitable: true,
        description: 'description 4',
        image: {
          path: '/assets/donut_factory.jpg',
          name: 'Donut Factory Image',
        },
      },
      {
        id: 13,
        name: 'pouloulou',
        isHabitable: true,
        description: 'description 4',
        image: {
          path: '/assets/donut_factory.jpg',
          name: 'Donut Factory Image',
        },
      },
      {
        id: 2,
        name: 'Duck Invaders',
        isHabitable: true,
        description: 'La danse ici est une religion',
        image: {
          path: '/assets/duck_invaders.jpg',
          name: 'Duck Invaders Image',
        },
      },
      {
        id: 3,
        name: 'Raccoon from Asgard',
        isHabitable: true,
        description: 'Espiegle mais pas trop',
        image: {
          path: '/assets/raccoon_asgards.jpg',
          name: 'Raccoon from Asgard Image',
        },
      },
      {
        id: 5,
        name: "Kikusan's world",
        isHabitable: true,
        description: null,
        image: {
          path: '/assets/raccoon_asgards.jpg',
          name: 'Raccoon from Asgard Image',
        },
      },
      {
        id: 8,
        name: "Kikusan's world 2",
        isHabitable: true,
        description: null,
        image: {
          path: '/assets/raccoon_asgards.jpg',
          name: 'Raccoon from Asgard Image',
        },
      },
      {
        id: 4,
        name: 'Schizo Cats',
        isHabitable: true,
        description: "Non leur planete n'est pas une pelote",
        image: {
          path: '/assets/schizo_cats.jpg',
          name: 'Schizo Cats Image',
        },
      },
    ];
    const planetOptions = planets.map((planet) => ({
      label: planet.name,
      value: planet.id.toString(),
    }));

    return (
      planetOptions?.filter((option) =>
        option.label.toLowerCase().includes(searchTerm?.toLowerCase() ?? ''),
      ) || []
    );
  };

  const astronautPlanet = () => {
    return {
      label: astronautForUpdate.originPlanet.name,
      value: astronautForUpdate.originPlanet.id.toString(),
    };
  };

  return (
    <Flexbox className={componentClassNames} flexDirection="column">
      <HUDWindow>
        <h2>Edit an Astronaut number:{astronautForUpdate.id}</h2>
        <Form onSubmit={validateAndSubmit} className={styles.astronautformForm} noValidate>
          <HUDInput
            name="firstname"
            label="firstname"
            placeholder="John"
            required
            defaultValue={astronautForUpdate.firstname}
            error={formState.firstname}
            ref={firstnameRef}
          />
          <HUDInput
            name="lastname"
            label="lastname"
            placeholder="Doe"
            required
            defaultValue={astronautForUpdate.lastname}
            error={formState.lastname}
            ref={lastnameRef}
          />

          <PlanetAutoComplete
            name="astronautOriginPlanet"
            fieldLabel="Astronaut origin planet"
            placeholder="Tapez pour rechercher..."
            autoCompleteOptions={options}
            defaultValue={astronautPlanet()}
            ref={originPlanetRef}
            error={undefined}
          />

          <Flexbox className={styles.astronautformButtons} alignItems="center" justifyContent="center">
            <HUDButton onClick={handleCancel}>CANCEL</HUDButton>
            <HUDButton>EDIT</HUDButton>
          </Flexbox>
        </Form>
      </HUDWindow>
    </Flexbox>
  );
}
