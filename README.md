Vera Kippel veki2400

I detta moment så har en frontend-sida skapats till del 1.
Sidan använder sig av fetch-anrop till ett skapat API. För registrering så anropas en POST-metod för att registrera en admin. Det finns även en logga in sida för användare som redan finns med i databasen.
När en admin är inloggad så visas en admin-sida samt en ny sida "Skyddad sida" i menyraden som inte obehöriga har tillgång till. På den skyddade sidan så visas alla användarnamn som är skapade.

Om en användare med samma användarnamn försöks skapas så visas ett felmeddelande till skärmen. Även om det är fel användarnamn/lösenord i logga in eller om den inte finns i databasen så kommer felmeddelandet fram.