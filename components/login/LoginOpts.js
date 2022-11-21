import Image from "next/image"
import { signIn } from "next-auth/react"
import { callbackURLSignIn } from "../../utils/consts"

export default function LoginOpts() {
    return (
        <div className="text-center">
            <h1 className="text-xl md:text-4xl mb-8 font-bold">
                Sign In To Continue
            </h1>
            <div className="space-y-3">
                {/* <LoginOption loginType="Google" />
        <LoginOption loginType="Twitter" /> */}
                <LoginOption loginType="Discord" />
                <LoginOption loginType="Twitter" />
            </div>
        </div>
    )
}

function LoginOption({ loginType }) {
    const handleSignIn = async (loginType) => {
        signIn(loginType.toLowerCase(), { callbackUrl: callbackURLSignIn() })
    }

    return (
        <div
            onClick={() => handleSignIn(loginType)}
            className="flex flex-row w-full py-4 bg-div2 hover:bg-plum-purple px-6 cursor-pointer"
        >
            <div className="flex flex-row space-x-3">
                <div>
                    <Image
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
