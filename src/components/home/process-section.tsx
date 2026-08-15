
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { IconForms, IconLink, IconShare, IconGift } from "@tabler/icons-react"

type feature = {
    key: number,
    title: string,
    icon: React.ReactNode,
    body: string

}
interface features {
    features: feature[]
}

export function FeaturesList({features}: features) {
    return(
        <div className="w-full h-fit flex flex-row flex-wrap items-center justify-center">
            {features.map((feature) => (
                <Card key = {feature.key} className="p-5 m-5 w-50 min-h-fit h-80 flex flex-col items-center justify-center bg-transparent backdrop-blur-md rounded-xl gap-5 border-2 border-muted">
                    <CardHeader className="w-full items-center justify-center">
                        <div className="w-full items-center justify-center">{feature.icon}</div>
                        <CardTitle className="w-full">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{feature.body}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

const features = [
    { key: 1, title: "Fill Out A Form", icon: <IconForms />, body: "Fill out a form with the birthday celebrant's name, age, birthday and the site password (optionally)" },
    { key: 2, title: "Get a Unique Set of Links", icon: <IconLink />, body: "You get two links: one for the form and one for the celebrant to see the site on that day." },
    { key: 3, title: "Share the Form Link", icon: <IconShare />, body: "Share the form link with friends and family to collect birthday wishes." },
    { key: 4, title: "Celebrate the Birthday", icon: <IconGift />, body: "On the birthday, the celebrant can view all the wishes and messages using the birthday link." } 

]

export default function FeaturesSection() {
    return(
        <div className="w-full h-fit flex flex-col p-5 bg-background">
            <h1 className="w-full text-center text-2xl md:text-4xl lg:text-6xl">
                How It Works
            </h1>
            <div className="w-full h-fit flex flex-row p-5">
                <FeaturesList features={features} />
            </div>
        </div>
    )
}