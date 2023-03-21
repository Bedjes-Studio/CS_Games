# Correction officielle du challenge 1 des CS Games 2023

Voici la correction officielle, pensez à tryhard avant de la lire !

# Flag 1 : Hauteur de l'image

Nous commençons le challenge avec l'image suivante :

[Texte alternatif](../2D4820D7CD60B9DDF808ABCAA0C60006D59B1EF25B04C832AA6F9798DC8ED471.jpeg "Titre de l'image").

L'une des première choses à vérifier en stéganographie est si notre affichage n'est pas faux. Pour cela, on ouvre l'image dans cyberchief, et on augmente la hauteur de l'image grace aux métadonnées. [Voici un excellent tutoriel pour en comprendre le fonctionnement](https://blog.cyberhacktics.com/hiding-information-by-changing-an-images-height/).

Notez qu'augmenter la hauteur nous permet également de vérifier la largeur. Les données étant continues, on joue simplement sur 'ajouter des retour lignes supplémentaires' à la fin du fichier. Si jamais on dépasse la hauteur maximum des données, cyberchief affichera quand même l'image. On augmente la hauteur et on trouve le flag : `flag{fenetres8BC}`


# Flag 2 : Steghide

On utilise maintenant [l'image donnée dans l'énoncé](../Carte_StegHide.jpeg "Titre de l'image"), qui est exactement la même image, mais avec la taille originale.

Comme indiqué dans l'énoncé, les flags permettent de trouver les suivants. Ainsi, il faut regarder les fenêtres !
On trouve qu'une ligne au centre est plus éclairée que les autres (c'est peut être moins visible pour ceux utilisant un filtre lumière bleue). Il y a exactement 16 fenêtres qui en binaire font : 10100111 01010010 = 42834 en base 10.
En utilisant le flag précédent toujours, on trouve fenetres8BC = 428348BC. On colle ça sur google et on trouve que ce chiffre correspond aux dates de naissance et de mort de Platon... créateur de l'atlantide ! Cette info est donc utile, mais n'est pas au format pour un flag. Notez que la stéganographie est souvent mélangée avec de l'OSINT, alors faites souvent un tour sur ce que vous trouvez.

Une autre chose à vérifier en stéganographie est la présence d'un élément caché. Dans notre cas, l'outil utilisé est StegHide. Il en existe plein, mais celui-ci est l'un de plus connu. On lance l'outil sur notre image, elle est reconnue donc c'est le bon outil. Comme clé on utilise le code 428348BC. On trouve le flag : `flag{614E645266556A586E3272357538782F413F4428472B4B6250655368566B5970}`.

# Flag 3 : AES256

Le flag précédent est une clé AES256, on utilise un site comme [celui-ci](https://www.devglan.com/online-tools/aes-encryption-decryption) pour décripter le nom du fichier : 2D4820D7CD60B9DDF808ABCAA0C60006D59B1EF25B04C832AA6F9798DC8ED471.

Attention, notre clé et notre texte est en hexadécimal ! Il faut convertir la clé pour cet outil. On utilise cyberchief avec un bloc 'fromHex', la clé devient `aNdRfUjXn2r5u8x/A?D(G+KbPeShVkYp`. On retourne sur l'outil et on trouve le flag : `flag{Atl@ntisI$H1dden}`