//declaration de la largeur et hauteur de grill du jeu comme constante
const HAUTEUR = 15;
const LARGEUR = 25;
//declaration des variables score, energie et nombre de bombe(pour utiliser plutard) et les initialiser 
let Score     = 0 ;
let Energie   = 40 ;
let nombrebombe = 3;
//en cherche l'element Grill par id qui est div, qui va contenir plusieurs div
let ShemaGrill = document.getElementById('Grill');
//en chechre les buttons par leurs id
let btnHaute  = document.getElementById('Haute');
let btnBas    = document.getElementById('Bas');
let btnGauche = document.getElementById('Gauche');
let btnDroite = document.getElementById('Droite');
let btnExit   = document.getElementById('Exit');
//en cherche la barre d'energie, div qui va contenir le score et le div pour afficher combien d'enrgie rest/40
let barreEnergie  = document.querySelector('.EnergieBarre');
let EnergieStatue = document.querySelector('.EnergieStatue');
let AfficherScore = document.querySelector('.AfficherScore');
//en ajoute dans le div la valeur score de debut de jeu qui est 0
AfficherScore.innerHTML = 'Score : \t' + (Score);
//declaration button rejouer je vais la chercher plutard car elle n'existe pas encore  
let btnRejouer;
// en cherche les trois bombes car elles sont crées mais ne sont pas visible
let btnBombe_1 = document.getElementById('Bombe1');
let btnBombe_2 = document.getElementById('Bombe2');
let btnBombe_3 = document.getElementById('Bombe3');

//ont cliquent sur une des trois bombe, ont fait leur effet qui est detruire les pieges autour de l'hero
//et je rendre la bombe invisible
btnBombe_1.addEventListener('click',()=> {
  DetruirePiege();
  btnBombe_1.classList.add('invisible');
});
btnBombe_2.addEventListener('click',()=> {
  DetruirePiege();
  btnBombe_2.classList.add('invisible');
});
btnBombe_3.addEventListener('click',()=> {
  DetruirePiege();
  btnBombe_3.classList.add('invisible');
});
//ont cliquent sur button haute on deplace l'hero vers l'haute
btnHaute.addEventListener('click',()=> {
  JeuDungeon.DeplacerHero('Haute');
});
//ont cliquent sur button bas on deplace l'hero vers le bas
btnBas.addEventListener('click',()=> {
  JeuDungeon.DeplacerHero('Bas');
});
//ont cliquent sur button gauche on deplace l'hero vers la gauche
btnGauche.addEventListener('click',()=> {
  JeuDungeon.DeplacerHero('Gauche');
});
//ont cliquent sur button droite on deplace l'hero vers la droite
btnDroite.addEventListener('click',()=> {
  JeuDungeon.DeplacerHero('Droite');
});
//ont cliquent sur button Exite ont affiche la fenetre exite
btnExit.addEventListener('click',()=> {
  JeuDungeon.DeplacerHero('Exit');
});

//declaration d'une fonction qui permet de cree une cree une grill plein de piege
const CreeGrill = () => {
  let grill = [];
  for (let i = 0; i < HAUTEUR; i++) {
    grill.push([]);
    for (let j = 0; j < LARGEUR; j++) {
      grill[i].push('P');
    }
  }
  //je place l'hero dans le millieu de la grill
  grill[7][12] = 'H';
  return grill;
};
//j'ai declarer ma grill comme une variable globale pour ne pas la passé comme paramatre dans chaque fonction
let grill = CreeGrill();
//declaration d'une fonction qui permet de masquer les button de movement et affiche la fenetre exite
const MasquerBtn_AfficherFentre = () => {
  let toutBtn = document.querySelector('.toutBtn');
  let FenetreExit = document.getElementById('FenetreExit');
  toutBtn.style.display = 'none';//pour les masquer
  FenetreExit.style.display = 'flex';//pour afficher la fentre
}
//cette methode est le contraire de la methode precedente
const AfficherBtn_MasquerFenetre = () => {
  let toutBtn = document.querySelector('.toutBtn');
  let FenetreExit = document.getElementById('FenetreExit');
  toutBtn.style.display = 'flex';//afficher les buttons 
  FenetreExit.style.display = 'none';//masquer la fenetre
}
/*
* cette methode permet de d'ajouté le contenu d'une tuile selon la case dans la grill
* elle fontionne a l'aide de la fonction  AjouterContenuTuile()
*/ 
const RemplireGrill = () => {
  for(let i = 0; i< HAUTEUR; i++)
  for(let j = 0; j< LARGEUR; j++)
  {
    switch(grill[i][j])
    {
      case 'P': 
        AjouterContenuTuile('url(./img/Piege.png)');
      break;
      case 'H':
        AjouterContenuTuile('url(./img/Hero.png)');
        break;
      case 'V':
        AjouterContenuTuile('url(./img/Tresore.png)');
        break;
      case 'T':
        AjouterContenuTuile('url(./img/Tresore.png)');
        break;
      case 'E' :
        AjouterContenuTuile('url(./img/Energie.png)');
        break;
      case 'M' :
        AjouterContenuTuile('url(./img/Mort.png)');
        break;
      case 'B' :
        AjouterContenuTuile('url(./img/TresoreBonus.png)');
        break;
      case 'I' :
        AjouterContenuTuile('url(./img/Bombe.png)');
        break;
      case 'X':
        AjouterContenuTuile('url(./img/TresoreBonus.png)');//cette case est un piege mais semble que une tuile tresore
        break;
    }
    
  }
}
/*
 *cette methode permet de creer un div,lui donné une class, une image convien a le contenu de 
 case dans la grill, on ajoute ce elment cree a shemagrill qui va etre afficher a l'utilisateur 
*/
const AjouterContenuTuile = (URLimag) =>{
  let Tuile = document.createElement('div');
  Tuile.style.backgroundImage= URLimag;
  Tuile.style.backgroundColor = '#57b020';
  Tuile.classList.add('Tuile');
  ShemaGrill.append(Tuile); 
}
/*
* cette methode pour placer un bonus, tuile mort ... il faut just donné 
* combien de case vous voulez et le caractere qui convient avec
*/ 
const PlacerContenuTuile = (Contenu, nombreDansGrill) =>
{
  for(let i = 1; i <= nombreDansGrill; i++ )
  {
    let j = Math.floor(Math.random()*(HAUTEUR -1));
    let k = Math.floor(Math.random()*(LARGEUR -1));
    if(grill[j][k] === 'P')
    {
      grill[j][k] = Contenu;
    }
    else
    i--;
  }
}
/**
 * cette methode permet de trouvé la position de l'hero 
 * elle retourne un object avec le numéro de ligne et le numero de colone
 */
const TrouverPositionHero = () => {
  for(let i = 0; i < HAUTEUR; i++ )
  {
    for(let j = 0; j < LARGEUR; j++)
    {
      if(grill[i][j] === 'H')
      {
        const PositionHero = {
          iHero: i,
          jHero: j
        };
        return PositionHero;
      }
    }
  }

}
/*
* puisque le jeu est representé par un tableau 2D  dans la memoire 
* mais dans l'affichage c'est completment different (des divs)
* pour trouver le div qui convient a la case dans la grill il faut faire ce calcule
*/
const GetIndexDiv =(i,j) =>
{
  return (LARGEUR * i) + j ;
} 
/*
  cette methode permet de changer la position de l'hero vers la prochaine tuile
*/ 
const ChangerPositionHero = (NouvellePositionHero,Direction) =>{
  let IndexDiv;
  let divProchaine;
  //si un deplacement vers Haute ou vers bas 
  if(Direction === 'Horizontale')
  {
    //on va fair les contraine imposer par le centenu de prochiane tuile
    ActionEffetTuile(GETContenuTuile(NouvellePositionHero,Direction));
    grill[NouvellePositionHero.DirectionHero][NouvellePositionHero.jHero] = 'H';//prochaine tuile recoit H veut dir hero
    IndexDiv = GetIndexDiv(NouvellePositionHero.DirectionHero,NouvellePositionHero.jHero);//trouver l'index de div 
    divProchaine = document.getElementById('Grill').children[IndexDiv];//selection la prochaine div
    divProchaine.style.backgroundImage = 'url(./img/Hero.png)';//mettre l'image d'hero 
    grill[NouvellePositionHero.iHero][NouvellePositionHero.jHero] = 'V';//remplacer la case precedent par V(vide) 
    IndexDiv = GetIndexDiv(NouvellePositionHero.iHero,NouvellePositionHero.jHero);//j'ai utiliser la meme variable 
    divProchaine = document.getElementById('Grill').children[IndexDiv];//selection div precedent 
    divProchaine.style.backgroundImage = 'none';//je masque l'ancien image de hero
    
  }
  else
  {
    ActionEffetTuile(GETContenuTuile(NouvellePositionHero,Direction));
    grill[NouvellePositionHero.iHero][NouvellePositionHero.DirectionHero] = 'H';
    IndexDiv = GetIndexDiv(NouvellePositionHero.iHero,NouvellePositionHero.DirectionHero);
    divProchaine = document.getElementById('Grill').children[IndexDiv];
    divProchaine.style.backgroundImage = 'url(./img/Hero.png)';
    grill[NouvellePositionHero.iHero][NouvellePositionHero.jHero] = 'V';
    IndexDiv = GetIndexDiv(NouvellePositionHero.iHero,NouvellePositionHero.jHero);
    divProchaine= document.getElementById('Grill').children[IndexDiv];
    divProchaine.style.backgroundImage = 'none';
    
  }
}
//voir le centenu de case pour utiliser l'effet qui convient avec la tuile
const GETContenuTuile = (NouvellePositionHero,Direction) => {
  if(Direction==='Horizontale')
    return grill[NouvellePositionHero.DirectionHero][NouvellePositionHero.jHero];
  else
    return grill[NouvellePositionHero.iHero][NouvellePositionHero.DirectionHero];
}
//faire les effet selon la case dans la grill
const ActionEffetTuile = (ContenuTuile)  =>{
  switch(ContenuTuile)
  {
    case 'T': // le cas tuile tresore j'augmente le score 1000
      Score += 1000;
       
      break;

    case 'V':// le cas tuile vide si score est plus grand de 10 je diminue 10 sinon j'affect 0 pour ne pas avoir score négatif
      if(Score >= 10 )
      { 
        Score -= 10 ;
         
      } 
      else
      {
        Score = 0;
        
      }  
      break;

    case 'P': // // le cas tuile piege si l'enrgie est 1 donc il reste un movement donc 
              //je diminue l'enrgie de 1 et je test le score sinon si l'enrgie plus grand de 1
              // je test le score si il est plus grand de 50 je diminue 50 sinon j'affecte 0
      if(Energie === 1)
      {
        
        Energie--;
        if(Score > 50)
        Score -= 50;
        else
         Score = 0

        RemplirFenetreExit();
        MasquerBtn_AfficherFentre();
      }
      else if(Energie > 1)
      {
         Energie -= 1;

         if(Score > 50)
           Score -= 50;
         else
          Score = 0;  
      }
      
      break;
      case 'E'://le cas tuile d'enrgie si l'enrgie inferieur ou egale 38 j'augment l'enrgie 2
        if(Energie <= 38)
        {
          Energie += 2;
          
        }  
        else
        {
          Energie = 40;
        }
        break;
      case 'M' ://le cas tuile mort le score 0 et l'energie 0 
        Score = 0;
        Energie = 0;
        RemplirFenetreExit();
        MasquerBtn_AfficherFentre();
        break;
      case 'B'://le cas tuile tresore bonus j'augmente le score 1600
        Score += 1600;
        break
      case 'I'://le cas tuile bombe je fait appele a la fontion collecterInventaire qui affiche la bobme en desus la barre d'enregie 
        CollecterInventaire(nombrebombe - 1);
        break;
      case 'X':// le cas tuile qui semble a un tesore bonus mais c'est un piege 
          if(Energie <= 3 )
          {
            Energie = 0;
            if(Score <= 500)
            Score = 0;
            else
            Score -= 500;
          }
          else
          {
            Energie -= 3;
            if(Score <= 500)
            Score = 0;
            else
            Score -= 500;
          }
          break;
          
  }
          //apres tout les changment sur le score et l'enrgie je doit visualiser les choses 
          AfficherScore.innerHTML = 'Score : \t ' + (Score); 
          barreEnergie.style.width = (Energie * 100)/40 + '%' ; 
          EnergieStatue.innerHTML = (Energie)+'/40';
}
//je appel cette fontion pour afficher les bombes desus la barre d'enrgie
const CollecterInventaire = (n) => {
  let BarreInventaire = document.querySelector('.BarreInventaire');
  let Bombe = BarreInventaire.children[n];
  nombrebombe--;
  Bombe.classList.remove('invisible')
}
//pour eviter les erreurs j'ai tester touts les cas possible 
//exemple erreur(hero i:0 j:2) si je click sur une bombe les piege autour hero(i:-1) donc erreur
const TesterPositionHero = (PositionHero) => {
     let limiteurBoucle = {
       imax : 0,
       jmax : 0, 
       idebut : 0,
       jdebut : 0,
     };
     if(PositionHero.iHero === 0 && PositionHero.jHero === 0 )
     {
       limiteurBoucle.imax = PositionHero.iHero + 1;
       limiteurBoucle.jmax = PositionHero.jHero + 1;
     }
     else if ( (PositionHero.iHero < HAUTEUR - 1 && PositionHero.iHero > 0 ) 
                && (PositionHero.jHero < LARGEUR - 1 && PositionHero.jHero > 0) )
     {
       limiteurBoucle.idebut = PositionHero.iHero - 1 ;
       limiteurBoucle.jdebut = PositionHero.jHero - 1 ;
       limiteurBoucle.imax = PositionHero.iHero + 1 ;
       limiteurBoucle.jmax = PositionHero.jHero + 1 ;
     }
     else if (PositionHero.iHero === 0 && (PositionHero.jHero > 0 && PositionHero.jHero  < LARGEUR -1))
     {
       limiteurBoucle.jdebut = PositionHero.jHero - 1;
       limiteurBoucle.imax = PositionHero.iHero + 1 ;
       limiteurBoucle.jmax = PositionHero.jHero + 1 ;
     }
     else if(PositionHero.jHero === LARGEUR -1 && (PositionHero.iHero > 0 && PositionHero.iHero < HAUTEUR - 1))
     {
       limiteurBoucle.idebut = PositionHero.iHero - 1;
       limiteurBoucle.jdebut = PositionHero.jHero - 1;
       limiteurBoucle.imax = PositionHero.iHero + 1;
       limiteurBoucle.jmax = PositionHero.jHero + 1;
     }
     else if (PositionHero.iHero === HAUTEUR -1 && (PositionHero.jHero > 0 && PositionHero.jHero < LARGEUR -1))
     {
       limiteurBoucle.idebut = PositionHero.iHero - 1;
       limiteurBoucle.jdebut = PositionHero.jHero - 1;
       limiteurBoucle.imax = PositionHero.iHero ;
       limiteurBoucle.jmax = PositionHero.jHero +1;
     }
     else if((PositionHero.iHero > 0 && PositionHero.iHero < HAUTEUR -1) && PositionHero.jHero === 0 )
     {
       limiteurBoucle.idebut = PositionHero.iHero -1;
       limiteurBoucle.jdebut = PositionHero.jHero -1;
       limiteurBoucle.imax = PositionHero.iHero + 1;
       limiteurBoucle.jmax = PositionHero.jHero +1;
     }
     else if(PositionHero.iHero === HAUTEUR - 1 && PositionHero.jHero === LARGEUR - 1)
     {
       limiteurBoucle.idebut = PositionHero.iHero - 1;
       limiteurBoucle.jdebut = PositionHero.jHero - 1;
       limiteurBoucle.imax = PositionHero.iHero;
       limiteurBoucle.jmax = PositionHero.jHero;
     }
     else if(PositionHero.iHero === 0 && PositionHero.jHero === LARGEUR - 1 )
     {
       limiteurBoucle.idebut = PositionHero.iHero;
       limiteurBoucle.jdebut = PositionHero.jHero - 1 ;
       limiteurBoucle.imax = PositionHero.iHero + 1;
       limiteurBoucle.jmax = PositionHero.jHero;

     }
     else if (PositionHero.iHero === HAUTEUR - 1 && PositionHero.jHero === 0)
     {
       limiteurBoucle.idebut = PositionHero.iHero - 1;
       limiteurBoucle.jdebut = PositionHero.jHero ;
       limiteurBoucle.imax = PositionHero.iHero ;
       limiteurBoucle.jmax = PositionHero.jHero + 1;
     }
     

     return limiteurBoucle;

}
//cette fonction permet de detruire les pieges autour l'hero 
const DetruirePiege = () => {
  let PositionHero = TrouverPositionHero();
  
  let limiteurBoucle = TesterPositionHero(PositionHero);
  let imax = limiteurBoucle.imax;
  let jmax = limiteurBoucle.jmax;
  let idebut = limiteurBoucle.idebut;
  let jdebut = limiteurBoucle.jdebut;
  
  let IndexDiv;let TuilePiege;
  for(let i = idebut ; i <= imax ; i++)
    for(let j = jdebut ; j <= jmax; j++)
    {
      if(grill[i][j] === 'P')
      {
        grill[i][j] = 'V';
        IndexDiv = GetIndexDiv(i,j);
        TuilePiege = document.getElementById('Grill').children[IndexDiv];
        TuilePiege.style.backgroundImage = 'none';

      }
    }
}
// je fait remplir ma fentre exite et je rendre les bombes invibles 
const RemplirFenetreExit = ()=>
{
  let Fenetre = document.querySelector('#FenetreExit');
  Fenetre.innerHTML = '<p id="PGameOver">Game Over</p>' +
                      '<p id="PScore" >Score : '+ Score +'</p>' +
                      '<input type="button" id="ExitRejouer" value="Rejouer"></input>';
  btnRejouer = document.getElementById('ExitRejouer');          
  btnRejouer.addEventListener('click',()=> {
  JeuDungeon.reinitialiserJeu();
  });
  btnBombe_1.classList.add('invisible');
  btnBombe_2.classList.add('invisible'); 
  btnBombe_3.classList.add('invisible'); 
}

const JeuDungeon = (function () {
  PlacerContenuTuile('I',3);//j'ai placé 3 bombe
  PlacerContenuTuile('T',40);//j'ai placé 40 tresore (10%)
  PlacerContenuTuile('B',6);//j'ai placé 6 coffre bonues qui augmente score 1600
  PlacerContenuTuile('M',7);//j'ai placé 7 tuile mort (le joueur perdre tout l'energie et tout le score )
  PlacerContenuTuile('E',4);//j'ai placé 4 tuile d'enrgie qui augmente l'enrgie 2  
  PlacerContenuTuile('X',2);//j'ai placé deux piege qui diminue l'energie 3 et le score 500
  RemplireGrill();
/**
 * pour deplacer l'hero j'ai fait cette fonction, selon le parametre passé je deplace mon hero
 *  */ 
  return{
    DeplacerHero : (evenment)=>{
      let PositionHero;
      switch(evenment)
      {
        case 'Haute':// je execute cette partie si le joueur a tappé le button avec la flech haute
          PositionHero = TrouverPositionHero();
            if(PositionHero.iHero - 1 >= 0 )//si l'hero n'a pas frenchie le bout de grill, je le deplace une pas vers le haute
                                            // j'ai cree un obj qui contient l'ancienne pos de l'hero et j'ai met i - 1 dans direction 
                                            // car je veux deplacer vers le haute 
                                            //meme chose avec les autres cases la seul diff dans nouvelle postion dection hero
            {
             const NouvellePositionHero = {
                iHero: PositionHero.iHero,
                jHero: PositionHero.jHero,
                DirectionHero : PositionHero.iHero - 1 
              };
              ChangerPositionHero(NouvellePositionHero,'Horizontale');
            }
            else if (PositionHero.iHero === 0)//sinon si l'hero veut sortir de la grill je fait exit
            {
              JeuDungeon.DeplacerHero('Exit');
            }
            break;
        case 'Bas':
          PositionHero = TrouverPositionHero();
            if(PositionHero.iHero + 1 < HAUTEUR )
            {
              const NouvellePositionHero = {
                iHero: PositionHero.iHero,
                jHero: PositionHero.jHero,
                DirectionHero : PositionHero.iHero + 1 
              };
              ChangerPositionHero(NouvellePositionHero,'Horizontale');
            }
            else if (PositionHero.iHero === HAUTEUR - 1)
            JeuDungeon.DeplacerHero('Exit');
            break;
        case 'Gauche':
          PositionHero = TrouverPositionHero();
            if(PositionHero.jHero - 1 >= 0 )
            {
               const NouvellePositionHero = {
                  iHero: PositionHero.iHero,
                  jHero: PositionHero.jHero,
                  DirectionHero : PositionHero.jHero - 1 
                };
                ChangerPositionHero(NouvellePositionHero,'Verticale');
            }
            else if (PositionHero.jHero === 0)
            JeuDungeon.DeplacerHero('Exit');
              break;
        case 'Droite':
          PositionHero = TrouverPositionHero();
            if(PositionHero.jHero + 1 < LARGEUR )
            {
              const NouvellePositionHero = {
                iHero: PositionHero.iHero,
                jHero: PositionHero.jHero,
                DirectionHero : PositionHero.jHero + 1 
                };
              ChangerPositionHero(NouvellePositionHero,'Verticale');
            }
            else if (PositionHero.jHero === LARGEUR - 1 )
            JeuDungeon.DeplacerHero('Exit');
            break;
        case 'Exit':
          RemplirFenetreExit();
          MasquerBtn_AfficherFentre();
          break;
      }

    },
    reinitialiserJeu : () => { //je reinitialise le jeu 
      Score = 0;// je mettre le score a 0
      Energie = 40;// je mettre l'enrgie a 40 
      nombrebombe = 3;
      ShemaGrill.replaceChildren('');//j'ai n'est pas trouvé une fonction pour vider la grill qui contient les div donc j'ai les replacer par une chaine vide
      barreEnergie.style.width = (Energie * 100)/40 + '%' ; 
      EnergieStatue.innerHTML = (Energie)+'/40';
      AfficherScore.innerHTML = 'Score : \t '+ (Score);
      AfficherBtn_MasquerFenetre();
      grill = CreeGrill();
      PlacerContenuTuile('I',2);
      PlacerContenuTuile('T',40);
      PlacerContenuTuile('B',5);
      PlacerContenuTuile('M',6);
      PlacerContenuTuile('E',3);
      PlacerContenuTuile('X',2);
      RemplireGrill();
    }
  }

})();
