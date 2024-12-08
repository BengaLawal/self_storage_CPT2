import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { QrCodeIcon, UnlockIcon, LockIcon } from 'lucide-react';

// eslint-disable-next-line react/prop-types
export function StorageUnitAccess({ unit, isOpen, onClose }) {
    const [accessMethod, setAccessMethod] = useState('pin');
    const [pin, setPin] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [accessLogs, setAccessLogs] = useState([]);

    useEffect(() => {
        // Reset unlock status when dialog opens/closes
        setIsUnlocked(false);
        setPin('');
    }, [isOpen]);

    const handleUnlock = () => {
        // Simulated unlock logic - in real app, this would call backend API
        const correctPin = unit.accessPin || '1234';

        if (pin === correctPin) {
            setIsUnlocked(true);
            logAccess(true);
        } else {
            logAccess(false);
            alert('Incorrect PIN. Access denied.');
        }
    };

    const logAccess = (success) => {
        const accessLog = {
            timestamp: new Date().toISOString(),
            unitId: unit.id,
            success: success,
            method: accessMethod
        };

        setAccessLogs(prev => [accessLog, ...prev].slice(0, 5));
    };

    const renderAccessMethod = () => {
        switch(accessMethod) {
            case 'pin':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Input
                                type="text"
                                placeholder="Enter 4-digit PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                maxLength={4}
                                className="flex-grow"
                            />
                            <Button
                                onClick={handleUnlock}
                                disabled={pin.length !== 4}
                                className="bg-green-500 hover:bg-green-600"
                            >
                                Unlock
                            </Button>
                        </div>
                    </div>
                );
            case 'qr':
                return (
                    <div className="text-center space-y-4">
                        <QrCodeIcon className="mx-auto h-32 w-32 text-blue-500" />
                        <p>Scan QR code at facility entrance</p>
                    </div>
                );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isUnlocked ? 'Access Granted' : 'Unlock Storage Unit'}
                    </DialogTitle>
                    <DialogDescription>
                        {console.log("This is meant to be a unit "+ unit)}
                        {unit.type} - {unit.facility}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                        <Button
                            variant={accessMethod === 'pin' ? 'default' : 'outline'}
                            onClick={() => setAccessMethod('pin')}
                        >
                            PIN Entry
                        </Button>
                        <Button
                            variant={accessMethod === 'qr' ? 'default' : 'outline'}
                            onClick={() => setAccessMethod('qr')}
                        >
                            QR Scan
                        </Button>
                    </div>

                    {renderAccessMethod()}

                    {isUnlocked && (
                        <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-2">
                            <UnlockIcon className="text-green-600" />
                            <span className="font-semibold text-green-800">
                                Unit Unlocked Successfully
                            </span>
                        </div>
                    )}

                    {/* Access Logs Section */}
                    {accessLogs.length > 0 && (
                        <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-semibold mb-2">Recent Access Attempts</h4>
                            {accessLogs.map((log, index) => (
                                <div
                                    key={index}
                                    className={`p-2 ${log.success ? 'bg-green-100' : 'bg-red-100'} rounded mb-1`}
                                >
                                    <p className="text-xs">
                                        {new Date(log.timestamp).toLocaleString()} -
                                        {log.success ? 'Successful' : 'Failed'} Access
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}