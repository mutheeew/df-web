package handlers

import (
	"context"
	episodedto "dumbmerch/dto/episode"
	dto "dumbmerch/dto/result"
	"dumbmerch/models"
	"dumbmerch/repositories"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

var path_file2 = "http://localhost:5000/uploads/"

type handlerEpisode struct {
	EpisodeRepository repositories.EpisodeRepository
}

func HandlerEpisode(EpisodeRepository repositories.EpisodeRepository) *handlerEpisode {
	return &handlerEpisode{EpisodeRepository}
}

func (h *handlerEpisode) FindEpisode(c echo.Context) error {
	Episode, err := h.EpisodeRepository.FindEpisode()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Episode})
}

func (h *handlerEpisode) FindEpisodeByFilm(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	Episode, err := h.EpisodeRepository.FindEpisodeByFilm(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Episode})
}

func (h *handlerEpisode) GetEpisode(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Episode, err := h.EpisodeRepository.GetEpisode(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	Episode.ThumbnailFilm = path_file + Episode.ThumbnailFilm
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Episode})
}
func (h *handlerEpisode) GetEpisodeByFilm(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	ide, _ := strconv.Atoi(c.Param("ide"))

	Episode, err := h.EpisodeRepository.GetEpisodeByFilm(id, ide)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	Episode.ThumbnailFilm = path_file + Episode.ThumbnailFilm
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Episode})
}

func (h *handlerEpisode) CreateEpisode(c echo.Context) error {
	// request := new(episodedto.EpisodeRequest)
	// if err := c.Bind(request); err != nil {
	// 	return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	// }
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	year, _ := strconv.Atoi(c.FormValue("year"))
	film_id, _ := strconv.Atoi(c.FormValue("film_id"))

	request := episodedto.EpisodeRequest{
		Title:         c.FormValue("title"),
		ThumbnailFilm: dataFile,
		LinkFilm:      c.FormValue("linkfilm"),
		Year:          year,
		FilmID:        film_id,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "dumbflix-img"})

	if err != nil {
		fmt.Println(err.Error())
	}

	// data form pattern submit to pattern entity db film
	Episode := models.Episode{
		Title:         request.Title,
		ThumbnailFilm: resp.SecureURL,
		LinkFilm:      request.LinkFilm,
		Year:          request.Year,
		FilmID:        request.FilmID,
	}

	data, err := h.EpisodeRepository.CreateEpisode(Episode)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertEpisodeResponse(data)})
}

func (h *handlerEpisode) UpdateEpisode(c echo.Context) error {
	request := new(episodedto.EpisodeRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))
	Episode, err := h.EpisodeRepository.GetEpisode(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Title != "" {
		Episode.Title = request.Title
	}
	if request.ThumbnailFilm != "" {
		Episode.ThumbnailFilm = request.ThumbnailFilm
	}
	if request.LinkFilm != "" {
		Episode.LinkFilm = request.LinkFilm
	}
	if request.Year != 0 {
		Episode.Year = request.Year
	}
	if request.FilmID != 0 {
		Episode.FilmID = request.FilmID
	}

	data, err := h.EpisodeRepository.UpdateEpisode(Episode)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}

func (h *handlerEpisode) DeleteEpisode(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Episode, err := h.EpisodeRepository.GetEpisode(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.EpisodeRepository.DeleteEpisode(Episode, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: data})
}
func convertEpisodeResponse(u models.Episode) models.EpisodeResponse {
	return models.EpisodeResponse{
		ID:            u.ID,
		Title:         u.Title,
		ThumbnailFilm: u.ThumbnailFilm,
		Year:          u.Year,
		LinkFilm:      u.LinkFilm,
		Film:          u.Film,
	}
}
