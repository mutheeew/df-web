package filmdto

import "dumbmerch/models"

type CreateFilmRequest struct {
	ID            int             `json:"id" gorm:"primary_key:auto_increment"`
	Title         string          `json:"title" form:"title"`
	ThumbnailFilm string          `json:"thumbnail" form:"thumbnail"`
	Year          int             `json:"year" form:"year"`
	Category      models.Category `json:"category" form:"category_id"`
	CategoryID    int             `json:"category_id" `
	LinkFilm      string          `json:"link" form:"link"`
	Description   string          `json:"description" form:"description"`
}

type UpdateFilmRequest struct {
	ID            int    `json:"id" gorm:"primary_key:auto_increment"`
	Title         string `json:"title" form:"title"`
	ThumbnailFilm string `json:"thumbnail" form:"thumbnail"`
	Year          int    `json:"year" form:"year"`
	CategoryID    int    `json:"category_id" `
	LinkFilm      string `json:"link" form:"link"`
	Description   string `json:"description" form:"description"`
}
