import { useEffect, useRef, useState } from "react";

const OtpComponent = () => {
    const length = 6;
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRef.current[0]?.focus();
    }, []);

    const handleOtp = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const otpCopy = [...otp];
        otpCopy[index] = value;
        setOtp(otpCopy);

        if (value && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (key: string, index: number) => {
        if (key !== "Backspace") return;

        const otpCopy = [...otp];

        if (otpCopy[index]) {
            otpCopy[index] = "";
        } else if (index > 0) {
            inputRef.current[index - 1]?.focus();
            otpCopy[index - 1] = "";
        }

        setOtp(otpCopy);
    };

    return (
        <div className="flex gap-2">
            {Array.from({ length }).map((_, idx) => (
                <input
                    key={idx}
                    ref={(el) => { (inputRef.current[idx] = el) }}
                    className="border w-12 h-12 text-center text-lg"
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => handleOtp(e.target.value, idx)}
                    onKeyDown={(e) => handleBackspace(e.key, idx)}
                />
            ))}
        </div>
    );
};

export default OtpComponent;
