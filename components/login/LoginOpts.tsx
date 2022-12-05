import Image from "next/image"
// import { signIn } from "next-auth/react"
import { ThemeSupa, Auth } from "@supabase/auth-ui-react"
// import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { supabase } from "../../utils/supabase"

export default function LoginOpts() {
    return (
        <div className="text-center">
            <h1 className="text-xl md:text-4xl mb-8 font-bold">
                Log In to Start
            </h1>
            <div className="space-y-3 px-8">
                {/* <LoginOption loginType="Twitter" /> */}
                <Auth
                    view="sign_up"
                    providers={["google","facebook"]}
                    supabaseClient={supabase}
                    appearance={{ 
                        theme: ThemeSupa ,
                        variables: {
                            default: {
                              colors: {
                                brandButtonText: "white",
                                anchorTextColor: 'white',
                                inputLabelText: "white",
                                inputText: "white",
                              },
                            },
                          },
                    }}
                            
                />
                {/* <LoginOption loginType="Google" />
         */}
                {/* <LoginOption loginType="Discord" /> */}
                {/* <LoginOption loginType="Twitter" /> */}
            </div>
        </div>
    )
}

async function signUp(providerId: string) {
    supabase.auth.signInWithSSO({options: {redirectTo: "http://localhost:3000"}, providerId})

    // const { error } = await supabase.auth.signIn(
        
    // );
    // if (error) {
    //     alert(error.message);
    // }
}

function LoginOption({ loginType }: any) {
    const handleSignIn = async (loginType: any) => {
        supabase.auth.signInWithOAuth({
            provider: loginType.toLowerCase(),
            // options: {redirectTo: "http://localhost:3000"}
        })
        const { error } = await supabase.auth.signInWithOAuth(
            {
            provider: loginType.toLowerCase(),
            })

        if (error) {
            console.log({ error })
        }
    }

    return (
        <div
            onClick={() => handleSignIn(loginType)}
            className="flex flex-row w-full py-4 px-6 cursor-pointer"
        >
            <div className="flex flex-row space-x-3">
                <div>
                    <Image
                        alt={loginType}
                        width={40}
                        height={40}
                        src={`/images/signin_${loginType}.svg`}
                    />
                </div>
                <p className="my-auto">{loginType}</p>
            </div>
        </div>
    )
}
