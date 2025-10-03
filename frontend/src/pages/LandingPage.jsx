import Header from "../components/Header"
import Particles from "../components/Particles"


const LandingPage = () => {
    return (
        <div className="min-h-screen   relative w-full flex ">
            <Particles
                className={"h-screen fixed top-0 right-0 w-full "}
                particleColors={["#ffffff", "#ffffff"]}
                particleCount={300}
                particleSpread={10}
                speed={0.3}
                particleBaseSize={100}
                alphaParticles={false}
                disableRotation={true}
            />

            <div className='w-full z-10'>
                <Header></Header>
            </div>


        </div>
    )
}

export default LandingPage