const BANYU_BRAND = '#dc143c';

export function ScanBackground() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
        >
            <div className="banyu-scan-stripe" />
            <div className="banyu-scan-glow" />
            <div className="banyu-scan-line" />

            <div
                className="absolute top-6 left-6 h-8 w-8 opacity-50"
                style={{
                    borderTop: `2px solid ${BANYU_BRAND}`,
                    borderLeft: `2px solid ${BANYU_BRAND}`,
                }}
            />
            <div
                className="absolute top-6 right-6 h-8 w-8 opacity-50"
                style={{
                    borderTop: `2px solid ${BANYU_BRAND}`,
                    borderRight: `2px solid ${BANYU_BRAND}`,
                }}
            />
            <div
                className="absolute bottom-6 left-6 h-8 w-8 opacity-50"
                style={{
                    borderBottom: `2px solid ${BANYU_BRAND}`,
                    borderLeft: `2px solid ${BANYU_BRAND}`,
                }}
            />
            <div
                className="absolute bottom-6 right-6 h-8 w-8 opacity-50"
                style={{
                    borderBottom: `2px solid ${BANYU_BRAND}`,
                    borderRight: `2px solid ${BANYU_BRAND}`,
                }}
            />
        </div>
    );
}

export default ScanBackground;
