import { uploadFile } from '../api/api';

interface FileUploadProps {
    onUploadSuccess: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                await uploadFile(formData);
                alert('CSV imported successfully!');
                onUploadSuccess(); // Trigger a data refresh.
            } catch (error) {
                alert('Failed to import CSV!');
            } finally {
                event.target.value = ''; // Clear the file input.
            }
        }
    };

    return (
        <div>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
      );
};

export default FileUpload;