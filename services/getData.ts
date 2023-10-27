export const getAllData = async () => {
    const response = await fetch("/api");

    if (!response.ok) throw new Error("Unable to fetch data.");

    return response.json();
};
