# Helper class to count the number of occurences of strings added to the dict.
class Freq_Dict:
    def __init__(self) -> None:
        self.dict = dict()

        self.highest_freq = 0
        self.highest_freq_key = ""

    def __str__(self) -> str:
        return str(self.dict)
    
    def add(self, key: str) -> None:
        if key in self.dict.keys():
            self.dict[key] += 1
        else:
            self.dict[key] = 1

        if self.dict[key] > self.highest_freq:
            self.highest_freq = self.dict[key]
            self.highest_freq_key = key

    def get_most_freq(self) -> str:
        return self.highest_freq_key