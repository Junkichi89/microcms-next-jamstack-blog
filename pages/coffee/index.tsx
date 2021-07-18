import React from "react";
import style from "./index.module.scss"
import { Grid, TextField, Button } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { NextPage } from "next";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers";
import Coffee from "../../models/Coffee";
import { useRouter } from "next/router";

const CoffeeIndex: NextPage = () => {
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("タイトルは必須項目です"),
    origin: Yup.string().required("国名は必須です。"),
  });

  const onSubmit = async (coffee: Coffee): Promise<void> => {
    console.log(baseUrl)
    try {
      await fetch(baseUrl + "/api/coffee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(coffee),
      }).then((res) => {
        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        }
      });

      void router.push("/coffee");
    } catch (err) {
      void router.push("/coffee");
    }
  };

  const { control, handleSubmit, errors } = useForm<Coffee>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={style.form}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            id="title"
            label="タイトル"
            name="title"
            autoComplete="title"
            defaultValue=""
            error={!!errors.title?.message}
          />
          {errors.title && <p className={style.error}>{errors.title.message}</p>}
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={TextField}
            control={control}
            variant="outlined"
            required
            fullWidth
            multiline
            rows={6}
            name="origin"
            label="内容"
            id="origin"
            autoComplete="origin"
            defaultValue=""
            error={!!errors.origin?.message}
          />
          {errors.origin && <p className={style.error}>{errors.origin.message}</p>}
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        className={style.send}
        aria-label="送信"
      >
        送信
      </Button>
    </form>
  );
};

export default CoffeeIndex;