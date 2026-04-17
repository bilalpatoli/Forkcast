type SearchHistoryInput = {
  location: string;
  cuisine: string;
  mood?: string;
};

export async function saveSearchHistory(input: SearchHistoryInput) {
  // TODO: Store searches for signed-in users.
  void input;
}

