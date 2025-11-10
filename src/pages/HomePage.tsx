import {Card} from "@src/shared/ui/card.tsx";
import {cn} from "@src/shared/utils/cn.ts";
import {Button} from "@src/shared/ui/button.tsx";

export const HomePage = () => {
    return (
        <div className={cn('flex flex-col items-center justify-center flex-1 px-6 py-12 text-center')}>
            <Card
                className={cn(
                    'max-w-md p-10 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl',
                    'shadow-[0_0_35px_rgba(139,92,246,0.25)]'
                )}
            >
                <h1 className="text-3xl font-semibold text-white mb-4">
                    Welcome to <span className="text-purple-400">Lumia Notes</span>
                </h1>
                <p className="text-slate-400 mb-8">
                    Secure, encrypted, and decentralized note-taking powered by Web3 identity.
                </p>

                <Button
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:opacity-90 transition"
                >
                    Connect with Lumia Passport
                </Button>
            </Card>
        </div>
    )
}

export default HomePage
