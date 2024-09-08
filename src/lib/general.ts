import { getURL } from "@/config";

interface ResponseData<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

type Params = {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
};

const handleFetchError = async (res: Response): Promise<void> => {
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
};

const fetchData = async (url: URL, options?: RequestInit): Promise<ResponseData> => {
  try {
    const res = await fetch(url.toString(), options);
    await handleFetchError(res);
    const data = await res.json();

    return { success: data.success ?? true, data, message: data.message };
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred";
    console.error("Fetch error:", message);
    return { success: false, data: [], message };
  }
};

const buildUrl = (path: string, params?: Params): URL => {
  const url = new URL(`/api/${path}`, getURL());

  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, String(value)));
  }

  return url;
};

const getAllCategories = (): Promise<ResponseData> => fetchData(buildUrl("get/en/config"));

const getAllGames = (params?: Params): Promise<ResponseData> => fetchData(buildUrl("get/en/games/tiles", params));

export default { getAllCategories, getAllGames };
