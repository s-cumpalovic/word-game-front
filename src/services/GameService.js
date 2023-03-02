import { ApiService } from "./ApiService";

class GameService extends ApiService {
  async sendWord(data) {
    try {
      const response = await this.client.post("/word-game", data);
      return response;
    } catch (err) {
      if (err.response.status == 400) {
        return err.response.data;
      } else {
        console.error(err); 
      }
    }
  }

  async getHighSchores() {
    try {
      const response = await this.client.get("/word-game");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }
}

export const gameService = new GameService();
