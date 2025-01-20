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
type Meal struct {
	// Id int `json:"id"`
	FoodName    string `json:"food_name"`
	WhereEaten  string `json:"where_eaten"`
	DateEaten   string `json:"date_eaten"`
	TimeEaten   string `json:"time_eaten"`
	Periods     string `json:"periods"`
	TimeSlots   string `json:"time_slots"`
	Ingredients struct {
		// Id 		  int  `json:"id"`	
		Carolie       float64 `json:"carolie"`
		Protein       float64 `json:"protein"`
		Fat           float64 `json:"fat"`
		Carbonhydrate float64 `json:"carbonhydrate"`
	}
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
func (a *App) GetDailyMeals(kind string, days int) []Meal {
	url := os.Getenv("env_mode")
	if kind == "breakfast" {
		kind = "morning"
	} else if kind == "lunch" {
		kind = "afternoon"
	} else {
		kind = "evening"
	}
	url = url + "/diets/" + kind + "/" + strconv.Itoa(days)
	httpClient := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)

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
	// read the response
	data,err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("Error reading response")
		log.Fatal(err)
	}
	var meals []Meal
	// Parse the JSON string
	err = json.Unmarshal(data, &meals)
	if err != nil {
		log.Println("Error parsing JSON")
		log.Fatal(err)
	}

	return meals
}
