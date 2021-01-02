import { makeStyles } from "@material-ui/core";

import Navbar from "./Navbar/Navbar"

const useStyles = makeStyles({
    main: {
        backgroundColor: "red",
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
    }, 
    body: {
        // display: "flex",
        // flex: "1",
        backgroundColor: "#f0f1f5",
        padding: "15px",
    }, 
    footer: {
        height: "50px",
        backgroundColor: "#1e254a",
        color: "#f0f1f5",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});



const SiteLayout = ( { children } ) => {

    const classes = useStyles();

    return (
        <main className={classes.main}>
            <header>
                <Navbar showMenu={false} openDrawerHandler={() => {}}></Navbar>
            </header>
            <section className={classes.body}>
                { children }
            </section>
            
            <footer className={classes.footer}>
                All rights reserved. Made by Carlos Loureda.
            </footer>

        </main>
    )

}

export default SiteLayout