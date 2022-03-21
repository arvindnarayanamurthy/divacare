const Head = () => {
    return (
        <>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="robots" content="index, follow" />
            {/** TODO: page desc */}
            <meta name="description" content="Contemporary Womens Health Care" />
            {/** TODO: page title */}
            <meta name="title" content="Diva Care" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/** TODO: page keywords */}
            <meta name="keywords" content="Obstetrics, Gynaecology, Fertility, Pregnancy, Maternal, IVF, Clinic, Laproscopy, Hysteroscopy" />

            <meta name="msapplication-TileColor" content="#97268F" />
            <meta name="msapplication-TileImage" content="/assets/images/ms-icon-144x144.png" />
            <meta name="theme-color" content="#97268F" />
            <meta name="mobile-web-app-capable" content="yes" />

            <meta name="full-screen" content="yes" />
            <meta name="browsermode" content="application" />
            <meta name="nightmode" content="enable" />

            <meta name="layoutmode" content="fitscreen/standard" />
            <meta name="imagemode" content="force" />
            <meta name="screen-orientation" content="portrait" />

            <link rel="canonical" href={process.env.HOST_NAME} />

            <link rel="apple-touch-icon" sizes="57x57" href="/assets/images/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/assets/images/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/assets/images/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/assets/images/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/assets/images/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/assets/images/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/assets/images/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/assets/images/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
        </>
    );
};

export default Head;
