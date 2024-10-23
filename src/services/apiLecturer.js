export async function getLecturers(query = '', pageNo = 0) {
    const params = {
        query: query ?? '',
        pageNo,
    };
    const queryString = '?' + new URLSearchParams(params).toString();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/lecturer/getAll${queryString}`);
    const data = await res.json();
    return data;
}

export async function getLecturer(id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/lecturer/get?id=${id}`);
        const data = await res.json();
        return data;
    } catch (e) {
        return null;
    }
}

export async function addLecturer(lecturerData) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/lecturer/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lecturerData), // thông tin giảng viên mới
        });

        if (!res.ok) {
            throw new Error('Thêm giảng viên thất bại');
        }

        const data = await res.text(); // Có thể trả về kết quả từ API nếu cần
        return data;
    } catch (error) {
        console.error('Error deleting lecturer:', error);
        throw error; // Ném lỗi để xử lý trong phần gọi hàm
    }
}

export async function updateLecturer(lecturerData, id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/lecturer/update?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lecturerData), // thông tin giảng viên mới
        });

        if (!res.ok) {
            throw new Error('Cập nhật giảng viên thất bại');
        }

        const data = await res.text(); // Có thể trả về kết quả từ API nếu cần
        return data;
    } catch (error) {
        console.error('Error updating lecturer:', error);
        throw error; // Ném lỗi để xử lý trong phần gọi hàm
    }
}

export async function deleteLecturer(id) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/lecturer/delete?id=${id}`, {
            method: 'DELETE',
        });

        if (!res.ok) {
            throw new Error('Xóa giảng viên thất bại');
        }

        const data = await res.text(); // Có thể trả về kết quả từ API nếu cần
        return data;
    } catch (error) {
        console.error('Error deleting lecturer:', error);
        throw error; // Ném lỗi để xử lý trong phần gọi hàm
    }
}
