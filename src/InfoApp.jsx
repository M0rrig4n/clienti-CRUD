import React from 'react';

function InfoApp(){
    return (
        <>
        <div className='container-info'>
            <h5>Descrizione del progetto</h5>
            <p>
                Questa semplice applicazione effettua operazioni <b>CRUD</b> interagendo con un database. 
                <br/>I dati possono essere quindi creati tramite un form, raccolti e mostrati nella pagina principale,
                modificati ed infine, cancellati.
                <br/>Gli elementi del progetto sono i <i><b>componenti React</b></i> necessari e la cartella "<b>api</b>" che si trova,
                localmente, nella directory dedicata all'applicazione <b>XAMPP</b>, utilizzata per testare il progetto.
                <br/>Di seguito, una breve descrizione dei diversi file.
            </p>
            <h5> main.jsx</h5>
            <p>
                Dopo aver importato le dependencies, il contenuto dell'elemento con Id "root" del documento viene controllato da React.<br/>
                Il component <b>App</b> si trova all'interno della StrictMode di React, che permette di risolvere alcuni problemi e bug apparentemente minori e secondari durante la scrittura del codice.
                <br/>Il file "main.jsx" viene richiamato nell'attributo "src" di <b>index.html</b>.
            </p>
            <h5>App.jsx</h5>
            <p>
                Prima di scrivere il codice del componente <b>App</b>, importo il css, bootstrap, gli altri componenti e BrowserRouter, Routes, Route e Link.<br/>
                In <b>BrowserRouter</b> riunisco l'output dell'applicazione e, tramite esso, instrado tutti i componenti che, nella pratica, non saranno necessariamente presentati nella stessa pagina. <br/>
                Grazie a <b>Routes</b>, la sua proprietà <i>path</i> e <b>Link</b>, infatti, posso direzionare i componenti a pagine diverse da quella principale.
                <br/>All'interno di BrowserRouter, nel mio caso, si trova <b>ListCliente</b>, che presenta la pagina principale. 
                <br/>A seguire, <b>CreateCliente</b> e <b>EditCliente</b>, i componenti che creano un nuovo utente e modificano i dati di un utente rispettivamente alle pagine "<i>cliente/create</i>" e "<i>cliente/:id/edit</i>".
                <br/>Come simil-footer, ho inserito un paragrafo che rimanda alla pagina dedicata alle <b>informazioni</b>.
            </p>
            <h5>ListCliente.jsx</h5>
            <p>
                Negli import ho inserito React, le sue funzioni <b>useEffect</b> e <b>useState</b>, i precedentemente citati BrowserRouter, Routes, Route e Link e, infine, <b>axios</b>. Grazie ad Axios, libreria di Javascript, posso mandare e ricevere richieste HTTP e interagire con le API che si trovano nella cartella "<b>api</b>", legata al localhost (127.0.0.1) di XAMPP, dove si trova il database che ho utilizzato per effettuare le operazioni CRUD.<br/>
                Nella funzione <b>ListCliente</b> ho utilizzato una <i>state-variable</i> e una <i>setter-function</i> unite all'hook <i>useState</i>, che permette di conservarne i valori e lo stato corrente. Richiamando la funzione successiva, <b>getClienti</b>, posso mostrare tutti i dati dei clienti presenti nel database mandando una richiesta <b>GET</b> al localhost.<br/>
                La funzione <b>deleteCliente</b> prende come parametro l'id del cliente, tramite l'uso di axios richiamo il metodo "<b>delete</b>" presente in <b>index.php</b> che cancella i dati del cliente con l'id inviato; infine, chiamo la funzione getClienti e mostro la nuova lista di clienti.
               <br/> Il componente ritorna una <b>tabella</b> con 5 colonne: 4 dedicate ai campi della table "<b>clienti</b>" nel database "<b>clienticrud</b>" (Id, Nome, Cognome, Contatti) ed una quinta usata per contenere i <i>bottoni</i> che permettono di modificare o cancellare i dati di un cliente.<br/>
                Nel body della tabella le righe saranno riempite con i dati raccolti dal <b>getClienti</b> presente all'inizio del codice utilizzando il metodo <b>map</b>.
                <br/>Il bottone per modificare i dati indirizza al form di modifica, mentre quello dedicato alla cancellazione dei dati richiede una <i>conferma</i> prima di effettuare l'azione.
            </p>
            <h5>CreateCliente.jsx</h5>
            <p>
                Oltre l'import di useState, React e axios, importo anche <b>useNavigate</b>, hook di React che permette all'utente di muoversi attraverso le diverse pagine dell'applicazione.
                <br/>All'inizio del componente <b>CreateCliente</b>, infatti, viene create la costante "<b>navigate</b>", a cui viene attribuita la funzione <b>useNavigate()</b>. Di seguito, uso <b>useState</b> per interagire con la state-variable creata, "<i>inputs</i>".
                Nella funzione return viene mostrato un <i>form</i> che richiede i dati del cliente che si vuole creare.<br/>
                I dati vengono raccolti tramite la funzione <b>handleChange</b> che, passatole l'"event", considera il nome dell'elemento che sta venendo modificato e i valori che sono stati inseriti. <br/>Per raccogliere effettivamente i dati, uso la funzione setter "<b>setInputs</b>", che naviga attraverso l'array di valori e li attribuisce ai nomi rispettivi.
                Con <b>handleSubmit</b>, che viene eseguita quando viene premuto il pulsate "<i>Crea</i>", mandiamo, tramite axios e il metodo post, i dati raccolti, che verranno gestiti in index.php. <br/>All'inizio della funzione ho inserito "<b>event.preventDefault()</b>", che blocca l'azione predefinita dell'evento. Infine, navigo alla pagina principale, dove <b>getClienti</b> mostrerà la nuova lista di clienti.
            </p>
            <h5>EditCliente.jsx</h5>
            <p>
                In aggiunta agli import precedenti, in EditCliente si può leggere <b>useParams</b>, che permette di accedere ai valori dei parametri dell'URL specificato nel percorso "<i>Route path</i>", ritornando un oggetto costituito da coppie key/value. Nel mio caso, nell'URL è presente "<b>:id</b>", l'id del cliente su cui si concentra la pagina.<br/>
                Grazie all'hook useEffect possiamo gestire ciò che accade all'esterno del nostro componente, come la raccolta dei dati dei clienti con <b>getClienti</b>.<br/>
                La funzione <i>handleChange</i>, chiamata quando cambiano i valori del form, funziona allo stesso modo di quella presente in <b>CreateCliente</b>, così come <i>handleSubmit</i>. La differenza è che, in questo caso, il metodo richiesto da axios è "<b>put</b>": vengono presi i dati presenti nel form e, nel caso di aggiornamento, inseriti come modifiche. <br/>Infine, anche qui, si viene rimandati alla pagina principale, con i dati aggiornati dei clienti. Nel form vengono proposti dei <i>valori predefiniti</i> per ogni input: quelli già presenti nella tabella del database.
            </p>
            <h5>index.css</h5>
            <p>
                All'interno di questo file si trova il codice css dedicato allo stile della pagina. Lo stile è semplice e ho scelto, per coerenza, di utilizzare sempre <b>rgb()</b> per la scelta dei colori. Grazie a <b>bootstrap</b>, il lavoro sullo stylesheet è meno complesso.
            </p>
            <h5>.htaccess</h5>
            <p>
                Il file è breve e dedicato alla <i>riscrittura</i> dell'URL: <b>RewriteEngine</b> settato a "on" per attivare la riscrittura; <b>RewriteCond</b> per riscrivere gli URL nel caso di richieste e <b>RewriteRule</b> con il parametro L, che indica l'ultima regola da interpretare. <br/>Con il file <b>.htaccess</b> possiamo, in generale dare istruzioni al web server Apache.
            </p>
            <h5>DbConnect.php</h5>
            <p>
                Grazie a questo file php instauro una <b>connessione</b> con il database, inserendo tutti i parametri da utilizzare. La connessione avviene effettivamente all'interno della funzione <b>connect()</b> e "<b>new PDO</b>" (PHP Data Objects), estensione PHP che mi permette di accedere al database. <br/>In caso di errori, il "catch" cattura l'exception e manda il messaggio di <i>errore</i>.
            </p>
            <h5>index.php</h5>
            <p>
                Prima di tutto, abilito l'<b>error-reporting</b>, configuro <b>ini_set</b>, includo il file <b>DbConnect.php</b> per avere l'accesso alla connessione al database e permetto, tramite "<b>header</b>" di interagire con diverse fonti esterne (Access-Control-Allow-Origin:_...).<br/>
                Creato un <b>nuovo oggetto</b> DbConnect, uso il metodo <i>connect()</i> per creare la connessione. Il metodo che viene inviato al server viene richiesto tramite <b>$_SERVER['REQUEST_METHOD']</b> e gestito attraverso uno switch con diversi casi.<br/>
                Nel caso di <b>GET</b>, la richiesta è di ottenere i dati dei cliente presenti nella tabella del database. La <b>query SQL</b> sarà quindi: <i>SELECT * FROM clienti</i>. Se voglio gestire i dati di un singolo cliente, avrò nell'URL il suo <b>id</b> quindi, prima di effettuare la query, controllo che sia presente l'id e, in caso positivo, aggiungo una seconda parte alla query "<i>WHERE ID=:ID</i>" e provo a connettermi al database preparando la query con il parametro :ID uguale a quello che si legge nell'URL. Eseguo la query e conservo i dati ottenuti trami te la funzione "<b>fetch</b>" in "clienti".<br/>
                Se i dati da ricevere sono quelli di <b>tutti</b> i clienti, mantengo la query iniziale, connetto, eseguo e "fetcho" tutto. Infine, codifico il risultato inserito in "clienti" in <b>JSON</b> e fermo l'esecuzione del case e dello switch.<br/>
                In caso di metodo <b>POST</b>, decodifico il contenuto di "clienti", preparo la query che mi permette di inserire i valori del nuovo cliente da creare, connetto ed eseguo. All'esecuzione dela query, la risposta può essere positiva o negativo, in ogni caso la mostro nella <b>console</b> e blocco case e switch.
                Nel caso di metodo <b>PUT</b>, agisco allo stesso modo ma con più <i>controlli</i>. PUT viene mandato quando viene richiesta la <b>modifica</b> dei dati di un utente. Dunque, prima di tutto decodifico i contenuti all'interno di "clientData" e controllo che effettivamente esistano. In caso negativo, errore e blocco dello switch.<br/>
                Se è presente un <b>ID</b> nell'URL, lo salviamo in cliendId, assicurandoci che sia di <b>tipo</b> "int". Scrivo la query all'interno di "sql" e controllo se sono stati inseriri dei nuovi dati all'interno degli input in base al loro nome. In caso positivo, aggiungo un controllo di posizione del valore, così da inserire correttamente le <b>virgole</b> nel caso decidessi di mostrarlo ed infine, inserisco il <b>nuovo valore</b> al nome del campo e setto <b>isFirst</b> a false.<br/>
                Se ci sono valori da aggiornare (se <b>isFirst</b> è false), aggiungo la <i>condizione</i> di Id alla query e la eseguo. In base alla risposta, sarà mostrato un errore o verranno modificati i dati. <br/>Se non viene aggiunto <b>nessun dato nuovo</b> ma vengono mantenuti i valori predefiniti, quando il pulsante viene cliccato, lo status mi permette di tornare comunque alla pagina principale, mandando però un messaggio alla console in cui viene riferito che non ci sono informazioni nuove. <br/>Per finire, si chiude il case e lo switch.
                <br/>Nel caso di metodo <b>Delete</b>, si prepara la query, si recupera l'id dall'URL e si esegue. A seconda dello status della risposta verranno mostrati messaggi diversi ed infine, viene chiuso lo switch.

            </p>
</div>
        </>
    );
}
export default InfoApp