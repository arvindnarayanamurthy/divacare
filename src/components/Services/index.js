const posts = [
    {
        title: "High-Risk Pregnancy",
        description:
        "In general, pregnancy should be considered a unique, physiologically normal episode in a woman’s life. However preexisting or unexpected illness of the mother or fetus can complicate the pregnancy. It is all about practicing evidence based management of all the challenges presented to us in our clinical practice.",
    },
    {
        title: "Infertility",
        description:
        "The doctor’s initial encounter with the infertile couple is the most important step, as it sets the tone for subsequent evaluation and treatment. Factors from both partners need to be evaluated before making a diagnosis and pursuing invasive treatments like IUI or ART ( IVF with ICSI ). In about one-third of cases, the cause of infertility involves only the male.In about one-third of cases, the cause of infertility involves only the female.In the remaining cases, the cause of infertility involves both the male and female, or no cause can be identified.",
    },
    {
        title: "Endoscopic Surgery",
        description:
        "Laproscopy revolution has been startlingly rapid and has been a boon to the patients as even a fibroid removal or hysterectomy is easy with patient getting back to normal in just a day or two. Procedures like tubal repair, septal correction, myomectomy, ovarian cystectomy, ovarian drilling or even evaluating the female reproductive system is easily done through laproscopy and hysteroscopy and not much time wasted in recovery for the anxious infertile couple waiting to concieve.",
    },
];

export default function Services() {
    return (
        <section id="services" className="relative overflow-hidden bg-background1 py-16 sm:py-20 md:py-24">
            <div className="relative px-4 sm:px-6 lg:px-8">
                <div className="relative max-w-7xl mx-auto text-text2">
                    <div className="text-center">
                        <h2 className="text-3xl tracking-tight font-extrabold text-text2 sm:text-4xl">How we can help you</h2>
                    </div>
                    <div className="mt-12 max-w-lg mx-auto grid gap-16 lg:grid-cols-3 lg:max-w-none">
                        {posts.map((post) => (
                            <div key={post.title} className="flex flex-col shadow-cardshadow overflow-hidden">
                                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                    <div className="flex-1">
                                        <div className="block mt-2">
                                            <p className="text-xl font-extrabold text-text2">{post.title}</p>
                                            <p className="mt-3 text-base text-gray-500">{post.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
