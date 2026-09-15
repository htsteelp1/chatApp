const colorClasses = {
    red: 'bg-red-900 text-red-500 border-red-500',
    orange: 'bg-orange-900 text-orange-500 border-orange-500',
    amber: 'bg-amber-900 text-amber-500 border-amber-500',
    yellow: 'bg-yellow-900 text-yellow-500 border-yellow-500',
    lime: 'bg-lime-900 text-lime-500 border-lime-500',
    green: 'bg-green-900 text-green-500 border-green-500',
    emerald: 'bg-emerald-900 text-emerald-500 border-emerald-500',
    teal: 'bg-teal-900 text-teal-500 border-teal-500',
    cyan: 'bg-cyan-900 text-cyan-500 border-cyan-500',
    sky: 'bg-sky-900 text-sky-500 border-sky-500',
    blue: 'bg-blue-900 text-blue-500 border-blue-500',
    indigo: 'bg-indigo-900 text-indigo-500 border-indigo-500',
    violet: 'bg-violet-900 text-violet-500 border-violet-500',
    purple: 'bg-purple-900 text-purple-500 border-purple-500',
    fuchsia: 'bg-fuchsia-900 text-fuchsia-500 border-fuchsia-500',
    pink: 'bg-pink-900 text-pink-500 border-pink-500',
    rose: 'bg-rose-900 text-rose-500 border-rose-500',
};

function hashColor(str) {
    const colors = Object.keys(colorClasses);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

export function ServerIcon({server}) {
    const color = hashColor(server.name);
    return (
        <div className={"w-8 overflow hover:brightness-80 "}>
            <div className={`border-2 rounded-sm flex w-8 h-8 justify-center items-center ${colorClasses[color]}`}>
                {server.name[0]}
            </div>
        </div>
    );
}