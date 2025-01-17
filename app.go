package main

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Place struct {
	Name     string `json:"name"`
	Location struct {
		Lat float64 `json:"lat"`
		Lng float64 `json:"lng"`
	} `json:"location"`
	Rating float64 `json:"rating"`
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	// load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) GetRecommendation(name string, timerange string, days int) []Place {
	endpoint := os.Getenv("env_mode")
	endpoint = endpoint + "/shop/healthy/" + name + "/" + timerange + "/" + strconv.Itoa(days)
	// call the endpoint
	httpClient := &http.Client{}
	req, err := http.NewRequest("GET", endpoint, nil)
	if err != nil {
		log.Println("Error creating request")
		log.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := httpClient.Do(req)
	if err != nil {
		log.Println("Error calling endpoint")
		log.Fatal(err)
	}
	defer resp.Body.Close()

	var places []Place
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("Error reading response")
		log.Fatal(err)
	}

	// Parse the JSON string
	err = json.Unmarshal(body, &places)
	if err != nil {
		log.Println("Error parsing JSON")
		log.Fatal(err)
	}
	
	return places

}
