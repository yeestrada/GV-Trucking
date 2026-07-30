export default function ApplicationLogo({ className = 'h-20 w-auto', ...props }) {
    return (
        <img
            {...props}
            src="/images/GV_Trucking_Logo.png"
            alt="GV Trucking LLC"
            className={`object-contain ${className}`}
        />
    );
}
