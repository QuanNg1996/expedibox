import express from "express";

const PORT = 3000;
const App = express();
// Le statut du casier virtuel (prêt/occupé) peut être simplement conservé dans une variable en mémoire sur le serveur.
let lockerStatus = "prêt";

App.use((_req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

App.post("/depot", (_req, res) => {
  // Si le casier était déjà occupé, l'API doit retourner une erreur.
  if (lockerStatus === "occupé") {
    return res.status(500).json({ message: 'Le casier est déjà occupé!' });
  };

  // On change l'état du casier et on retourne le code du statut avec le nouvel état du casier
  lockerStatus = "occupé";
  return res.status(200).send(`Le casier est maintenant ${lockerStatus}`);
});

App.post("/retrait", (_req, res) => {
  // Si le casier était déjà prêt, l'API doit retourner une erreur.
  if (lockerStatus === "prêt") {
    return res.status(500).json({ message: 'Le casier est déjà prêt!' });
  }

  // On change l'état du casier et on retourne le code du statut avec le nouvel état du casier
  lockerStatus = "prêt";
  return res.status(200).send(`Le casier est maintenant ${lockerStatus}`);
});

App.get('/statut', (_req, res) => {
  // On retourne l'état du casier
  return res.send(JSON.stringify({ lockerStatus }));
});

App.listen(PORT, () => console.log(`Server running on port ${PORT}`));
