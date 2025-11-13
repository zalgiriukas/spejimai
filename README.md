
# Žalgirio spėjimų žaidimas (statinis puslapis)

Vieno HTML failo aplikacija spėjimams apie **Žalgirio** Eurolygos rungtynių taškų skirtumą.

## Funkcijos
- Įveskite spėjimus kiekvienam dalyviui (taškų skirtumas, pvz. `+7` ar `-3`).
- Po rungtynių: automatiškai paimkite **oficialų rezultatą** iš *EuroLeague Live* API (Boxscore/Points/Header) ir suskaičiuokite taškus.
- Taisyklės: **+2** už **tikslų** pataikymą; jei tikslių nėra – **+1** artimiausiam (-iems).
- **Rungtynių parinkiklis**: įkelkite **Žalgirio tvarkaraštį** pagal sezoną ir pasirinkite rungtynes iš sąrašo – kodai užsipildys patys, jeigu sužaista, rezultatas atsisiunčiamas.
- Visa informacija saugoma **naršyklės localStorage**.

> API šaltiniai: EuroLeague Swagger (pvz., `/v1/schedules`, `/v1/results`) ir bendruomenėje dokumentuoti „Live“ galiniai taškai (`Boxscore`, `Points`, `Header`).

## Greitas paleidimas
1. Atsidarykite `index.html` naršyklėje (dvigubas paspaudimas arba „Open With > Browser“).
2. Jei norite **viešos nuorodos**, žemiau – GitHub Pages / Netlify.

## Diegimas į **GitHub Pages** (nemokamai)
1. Sukurkite viešą GitHub repozitoriją, pvz., `zalgiris-spejimai`.
2. Įkelkite failus: `index.html` (ir šį `README.md`).
3. GitHub repo: **Settings → Pages**: 
   - *Source*: **Deploy from a branch**; 
   - *Branch*: **main** ir **/** (root). 
4. Išsaugokite – po kelių minučių gausite URL `https://<jusu-vartotojas>.github.io/zalgiris-spejimai/`.

## Alternatyva: **Netlify Drop** (drag‑and‑drop)
1. Eikite į https://app.netlify.com/drop
2. „Drop“ įkelkite `index.html` – gausite **vienkartinę viešą nuorodą**. 
3. Jei norite nuolatinės nuorodos/domeno – susikurkite paskyrą ir sukurkite projektą iš GitHub repo.

## Pastabos dėl API ir CORS
- Puslapis siunčia `fetch` užklausas į `https://api-live.euroleague.net/v1/...` (Swagger) ir `https://live.euroleague.net/api/...` (Live). 
- Jei naršyklė blokuos dėl **CORS**, pasirinkite vieną iš variantų:
  1) rankiniu būdu įrašykite oficialų skirtumą;
  2) naudokite Netlify Functions / Cloudflare Workers kaip „proxy“ (pridėkite paprastą serverinę funkciją, kuri iškviečia API ir grąžina JSON su `Access-Control-Allow-Origin: *`).

## Privatumas
- Visi duomenys laikomi tik Jūsų naršyklėje (localStorage). Puslapis niekur nekaupia ir neišsiunčia dalyvių duomenų.

---
Sėkmės spėjimuose!
