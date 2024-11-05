// Function to retrieve or generate a unique device ID
export function getDeviceId() {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
        deviceId = `device-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
}