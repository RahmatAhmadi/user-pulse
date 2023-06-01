import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const TodoList = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const isFaLanguage = i18n.language === "fa";
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setNewTodo("");
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleEditTodo = (index: number) => {
    setEditingIndex(index);
  };

  const handleSaveTodo = (index: number) => {
    setEditingIndex(null);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo, i) =>
        i === index ? event.target.value : prevTodo
      )
    );
  };

  const containerStyles = {
    direction: isFaLanguage ? "rtl" : "ltr",
    width: isSmallScreen ? "350px" : "400px",
    marginTop: "7rem",
    backgroundColor: theme.palette.mode === "dark" ? "#1f1f1f" : "white",
    color: theme.palette.mode === "dark" ? "white" : "inherit",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
  };

  const textStyles = {
    marginBottom: "2rem",
  };

  const todoItemStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    backgroundColor: theme.palette.mode === "dark" ? "#2f2f2f" : "#f5f5f5",
    color: theme.palette.mode === "dark" ? "white" : "inherit",
    paddingRight: i18n.language === "fa" ? "10px" : null,
    paddingLeft: i18n.language === "fa" ? null : "10px",

    borderRadius: "5px",
  };

  const buttonStyles = {
    width: isSmallScreen ? "100%" : "100px",
    marginTop: "1rem",
  };

  return (
    <Container sx={containerStyles}>
      <Typography variant="h6" align="center" sx={textStyles}>
        {t("todo list")}
      </Typography>
      <form onSubmit={handleAddTodo}>
        <TextField
          label={t("new todo")}
          variant="outlined"
          value={newTodo}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={buttonStyles}
        >
          {t("add")}
        </Button>
      </form>
      <Box mt={2}>
        {todos.map((todo, index) => (
          <Box key={index} sx={todoItemStyles}>
            {editingIndex === index ? (
              <TextField
                value={todo}
                onChange={(event) => handleOnChange(event, index)}
                onBlur={() => handleSaveTodo(index)}
                fullWidth
              />
            ) : (
              <Typography sx={{ flex: 1 }}>{todo}</Typography>
            )}
            <Box sx={{ display: "flex" }}>
              {editingIndex === index ? (
                <IconButton
                  color="primary"
                  onClick={() => handleSaveTodo(index)}
                >
                  <CheckIcon />
                </IconButton>
              ) : (
                <IconButton
                  color="primary"
                  onClick={() => handleEditTodo(index)}
                >
                  <EditIcon />
                </IconButton>
              )}
              <IconButton color="error" onClick={() => handleDeleteTodo(index)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default TodoList;
