import React, { useEffect, useState } from 'react';

const RecetteListe = () => {
    const [recettes, setRecettes] = useState([]);
    const [motcleSearch, setmotcleSearch] = useState('');
    const [results,setResults] = useState([]);

    const search = event => {
        const motcleSearch = event.target.value;
        setmotcleSearch(motcleSearch);


        //Cette partie consiste à filtrer les données selon le mot clé 

        const RecettesFilter = recettes.filter(recette => {
            const { nom, description, ingredients } = recette;
            const motcleSearchLower = motcleSearch.toLowerCase();

            //Verifier si le mot cle de recherche figure dans le nom , la description ou un des ingredients
            return (
                nom.toLowerCase().includes(motcleSearchLower) || description.toLowerCase().includes(motcleSearchLower) || ingredients.some(ingredient =>
                    ingredient.toLowerCase().includes(motcleSearchLower))
            ) ;
        });

        setResults(RecettesFilter);
    };



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
            <input 
            type="text"
            value={motcleSearch}
            onChange={search}
            placeholder='Chercher des recettes ...'
        />

        {motcleSearch !== '' && results.length === 0 ? (
            <p>Aucune recette trouvée </p>
        ) : (
            (results.length > 0 ? results : recettes).map(recette => (
                <div key={recette.id}>
                    <h2>{recette.nom}</h2>
                    <p>{recette.description}</p>
                    <ul>
                        {recette.ingredients.map((ingredient, ind) => (
                            <li key={ind}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

            ))
        )}
        </div>
    );
};
export default RecetteListe;
