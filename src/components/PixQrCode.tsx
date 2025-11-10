import QRCode from 'react-native-qrcode-svg';

export default function PixQrCode({data}: {data: string}) {
    return <QRCode value={data} />
}