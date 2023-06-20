import React, { useEffect, useState } from 'react';

const RecetteListe = () => {
    const [recettes, setRecettes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/api/recipes')
        .then(reponse => reponse.json())
        .then(donnee => {
            setRecettes(donnee.recettes);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div>
            <h1>Recettes</h1>
            {recettes.map(recette => (
                <div key={recette.id}>
                    <h2>{recette.name}</h2>
                    <p>{recette.description}</p>
                <ul>
                    {recette.ingredients.map((ingredient, ind) => (
                        <li key={ind}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            ))}
        </div>
    );
};

export default RecetteListe;