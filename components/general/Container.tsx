type Props = {
    // title: string,
    children: JSX.Element,
  };

export default function Container({children}:Props ) {
    return (
        <div className="shadow-xl flex flex-col bg-card1 rounded-lg px-4 py-9 min-h-screen w-full">
            {children}
        </div>
    )
}